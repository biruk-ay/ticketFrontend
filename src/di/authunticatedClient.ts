import { BASE_URL } from "../configs/config";
import AuthenticatedNetworkClient from "../lib/request/authunticatedClient";
import GetToken from "../lib/utlis/token";

export default class AuthenticatedProvider {

	public static networkAccess: AuthenticatedNetworkClient;
    public static networkRefresh: AuthenticatedNetworkClient;

	public static provideNetworkAccess(): AuthenticatedNetworkClient{
		if(this.networkAccess === undefined){
			this.networkAccess = new AuthenticatedNetworkClient(BASE_URL, GetToken.getAccessToken());
		}
		// console.log(GetToken.getAccessToken());
		return this.networkAccess;
	}

    public static provideNetworkRefresh(): AuthenticatedNetworkClient{
		if(this.networkRefresh === undefined){
			this.networkRefresh = new AuthenticatedNetworkClient(BASE_URL, GetToken.getRefreshToken());
		}
		return this.networkRefresh;
	}
}