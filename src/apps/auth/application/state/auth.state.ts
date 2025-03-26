

export default interface AuthState {
    
    isLoggedIn: boolean;
    name?: string | null;
    email?: string | null;
    token?: string | null;
    role?: string | null;
    id?: string | null;
    loading: boolean;
    error: string | null;


}

export interface AuthResponse {

    name?: string | null;
    email?: string | null;
    token?: string | null;
    role?: string | null;
    id?: string | null;

}