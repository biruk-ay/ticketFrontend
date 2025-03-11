import { Component } from "react";
import ticketRepository from "../../data/repository/ticket.repository";

interface ListProps {
    onEdit: (component: "Update", id: string) => void;
}

interface ListState {
    tickets: { id: string; title: string; description: string; status: string }[];
}

class List extends Component<ListProps, ListState> {
    constructor(props: ListProps) {
        super(props);
        this.state = {
            tickets: [],
        };
    }

    async componentDidMount() {
        try {
            const response = await ticketRepository.all();
            console.log(response);
            this.setState({ tickets: response.results.map((ticket, index) => ({
                id: (index + 1).toString(),  
                title: ticket.title,
                description: ticket.description,
                status: ticket.status
            })) });        
        } catch (error) {
            console.error("Error fetching tickets:", error);
        }
    }

    render() {
        return (
            <div className="w-full p-6">
                <h2 className="text-3xl italic text-center text-primary mt-10 mb-6">List Tickets</h2>
                <table className="w-full rounded-lg overflow-hidden">
                    <thead>
                        <tr className="text-black border-b-1 border-gray-300 justify-end items-end">
                            <th className="p-3 text-start font-semibold italic">No</th>
                            <th className="p-3 text-start font-semibold italic">Title</th>
                            <th className="p-3 text-start font-semibold italic">Description</th>
                            <th className="p-3 text-start font-semibold italic">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tickets.length > 0 ? (
                            this.state.tickets.map((ticket) => (
                                <tr key={ticket.id} className="border-b border-gray-300 rounded-2xl font-pro hover:bg-gray-50 transition">
                                    <td className="p-3">{ticket.id}</td>
                                    <td className="p-3">{ticket.title}</td>
                                    <td className="p-3">{ticket.description}</td>
                                    <td className="p-3">{ticket.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="p-3 text-center">No tickets available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default List;
