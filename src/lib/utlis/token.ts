
export default class GetToken {
    
    public static getAccessToken(): string | null {
        return localStorage.getItem("token") as string;
    }

    public static getRefreshToken(): string | null {
        return localStorage.getItem("refreshToken") as string;
    }
}