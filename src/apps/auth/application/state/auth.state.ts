

export default interface AuthState {
    
    isLoggedIn: boolean;
    name?: string | null;
    email?: string | null;
    accessToken?: string | null;
    role?: string | null;
    id?: string | null;
    loading: boolean;
    error: string | null;


}