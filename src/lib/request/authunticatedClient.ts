import axios, { AxiosResponse, type AxiosInstance } from "axios";
import NetworkClient from "./networkClient";
import { BASE_URL } from "../../configs/config";

export default class AuthenticatedNetworkClient extends NetworkClient{

	private token: string;
	private isRefreshing = false;
	private refreshSubscribers : ((token: string) => void)[] = [];
	

	constructor(
		baseUrl: string,
		token: string
	){
		super(baseUrl);
		this.token = token;
	}

	protected onCreateClient(baseUrl: string): AxiosInstance {
		console.log(this.token);
		const instance = axios.create({
			baseURL: baseUrl,
			withCredentials: true,	
			headers: {
				"Authorization": `Token ${this.token}`
			}
		});
		
		instance.interceptors.response.use(
			(response) => {
				if (response.data.token) {
					this.token = response.data.token;
					localStorage.setItem("accessToken", this.token);
				}
				return response;
			},
			async (error) => {
				const originalRequest = error.config;
		
				if (error.response?.status === 403 && !originalRequest._retry) {
					if (!this.isRefreshing) {
						this.isRefreshing = true;
						try {
							const newToken = await this.refreshToken();
							console.log("Token before change: ", this.token);
							this.token = newToken;
							console.log("Token Changed: ", newToken );
							localStorage.setItem("accessToken", this.token);
							this.refreshSubscribers.forEach((cb) => cb(newToken));
							this.refreshSubscribers = [];
						} catch (refreshError) {
							return Promise.reject(refreshError);
						} finally {
							this.isRefreshing = false;
						}
					}
		
					return new Promise((resolve) => {
						this.refreshSubscribers.push((token: string) => {
							originalRequest._retry = true;
							originalRequest.headers.Authorization = `Bearer ${token}`;
							resolve(instance(originalRequest));
						});
					});
				}
		
				return Promise.reject(error);
			}
		);
		
		return instance;
	}



	private async refreshToken(): Promise<string> {
		try {
			const response: AxiosResponse<{ token: string }> = await axios.post(
				`${BASE_URL}/auth/refresh`, 
				{}, 
				{ withCredentials: true }
			);
			console.log("Refresh Token: ", response.data.token);
			return response.data.token;
		} catch (error) {
			throw new Error("Failed to refresh token. Please login again.");
		}
	}
	

}