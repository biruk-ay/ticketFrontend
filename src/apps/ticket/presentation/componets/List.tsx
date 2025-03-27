import { useEffect, useState } from "react";
import ticketRepository from "../../data/repository/ticket.repository";
import Loading from "../../../../componets/loading";

interface Ticket {
    id: string;        
    title: string;
    description: string;
    status: string;
}

interface TicketResponse {
    results: Ticket[];
}

const List = () => {
    const [ loading, isLoading ] = useState(false);
    const [ tickets, setTickets ] = useState<Ticket[]>([]) 

    useEffect(() => {
        const fetchTickets = async () => {
            isLoading(true);
            try {
                const response = await ticketRepository.all() as unknown as TicketResponse;
                console.log("response : ", response.results);
                setTickets(response.results)
            } catch {
                console.log("Error while fetching tickets");
            } finally {
                isLoading(false)
            }

        };
        fetchTickets();
    }, [])

    if(loading) {
        return <Loading />
    }

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
                    {tickets.length > 0 ? (
                        tickets.map((ticket, index) => (
                            <tr key={ticket.id} className="border-b border-gray-300 rounded-2xl font-pro hover:bg-gray-50 transition">
                                <td className="p-3">{index + 1}</td>
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




export default List;
