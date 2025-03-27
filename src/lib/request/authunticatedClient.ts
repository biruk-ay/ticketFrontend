import axios, { AxiosInstance } from "axios";
import NetworkClient from "./networkClient";
import authRepository from "../../apps/auth/data/repository/auth.repository";
import { AuthResponse } from "../../apps/auth/application/state/auth.state";

export default class AuthenticatedNetworkClient extends NetworkClient{

	private isRefreshing = false;
	private refreshSubscribers : ((token: string) => void)[] = [];
	private tokenProvider: () => string | null;

	constructor(
		baseUrl: string,
		tokenProvider: () => string | null
	){
		super(baseUrl);
		this.tokenProvider = tokenProvider;
	}

	private get token() {
		return this.tokenProvider();
	}

	protected onCreateClient(baseUrl: string): AxiosInstance {
		console.log("AutunticatedClient token: ", this.token);
		const instance = axios.create({
			baseURL: baseUrl
		});
		
		instance.interceptors.response.use(
			(response) => {
				if (response.data.token) {
					localStorage.setItem("token", response.data.token);
				}
				return response;
			},
			async (error) => {
		
				const originalRequest = error.config;
				console.log("Invalid token: ", error.response?.data.result);
				if (error.response?.status === 403 && !originalRequest._retry && (error.response?.data.result === "Invalid token") ) {
					if (!this.isRefreshing) {
						this.isRefreshing = true;
						try {
							const newToken = await authRepository.refresh() as AuthResponse;
							console.log("Token before change: ", this.token);
							console.log("Token Changed: ", newToken.token as string );
							localStorage.setItem("token", newToken.token as string);
							this.refreshSubscribers.forEach((cb) => cb(newToken.token as string));
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
		instance.interceptors.request.use(
            (config) => {
                const latestToken = this.tokenProvider();
                if (latestToken) {
                    config.headers["Authorization"] = `Token ${latestToken}`;
                }
                console.log("AuthenticatedClient using token:", latestToken);
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
		
		return instance;
	}



	// private async refreshToken(): Promise<string> {
	// 	try {
	// 		const response: AxiosResponse<{ token: string }> = await axios.post(
	// 			`${BASE_URL}/auth/refresh`, 
	// 			{}, 
	// 			{ withCredentials: true }
	// 		);
	// 		console.log("Refresh Token: ", response.data.token);
	// 		return response.data.token;
	// 	} catch (error) {
	// 		throw new Error("Failed to refresh token. Please login again.");
	// 	}
	// }
	

}