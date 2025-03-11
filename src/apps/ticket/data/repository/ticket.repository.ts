import AuthenticatedProvider from "../../../../di/authunticatedClient";
import AllRequest from "../request/AllRequest";
import CreateRequest from "../request/CreateRequest";

class TicketRepository {

    private accessClient = AuthenticatedProvider.provideNetworkAccess();
    
    public async all() {
        return await this.accessClient.execute(new AllRequest());
    }

    public async create(title: string, description: string, status: string) {
        return await this.accessClient.execute(new CreateRequest(title, description, status));
    }
}

export default new TicketRepository;