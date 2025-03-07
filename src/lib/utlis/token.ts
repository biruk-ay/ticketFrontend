
export default class GetToken {
    
    public static getAccessToken(): string {
        return localStorage.getItem("accessToken") as string;
    }

    public static getRefreshToken(): string {
        return localStorage.getItem("refreshToken") as string;
    }
}