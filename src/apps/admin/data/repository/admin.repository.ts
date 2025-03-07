import AuthenticatedProvider from "../../../../di/authunticatedClient";
import AllRequest from "../request/AllRequest";
import UpdateRequest from "../request/UpdateRequest";

class AdminRepository {

    private accessClient = AuthenticatedProvider.provideNetworkAccess();
    
    public async all() {
        return await this.accessClient.execute(new AllRequest());
    }

    public async update(status: string, id: string) {
        return await this.accessClient.execute(new UpdateRequest(status, id));
    }
}

export default new AdminRepository;