import AuthenticatedProvider from "../../../../di/authunticatedClient";
import NetworkProvider from "../../../../di/networkClient";
import LoginRequest from "../request/login.request";
import LogoutRequest from "../request/logout.request";
import RefreshRequest from "../request/refresh.request";
import SignupRequest from "../request/signup.request";

class AuthRepository {

    private networkClient = NetworkProvider.provideNetworkClient();
    private accessClient = AuthenticatedProvider.provideNetworkAccess();
    private refreshClient = AuthenticatedProvider.provideNetworkRefresh();

    
    public async signup(name: string, email: string, password: string, role: string) {
        return await this.networkClient.execute(new SignupRequest(name, email, password, role));
    }

    public async login(email: string, password: string) {
        return await this.networkClient.execute(new LoginRequest(email, password));
    }

    public async logout() {
        localStorage.removeItem("persist:root");
        localStorage.removeItem("accessToken");
        const result = await this.accessClient.execute(new LogoutRequest());
        return result;
    }

    public async refresh() {
        return await this.refreshClient.execute(new RefreshRequest());
    }
}

export default new AuthRepository;