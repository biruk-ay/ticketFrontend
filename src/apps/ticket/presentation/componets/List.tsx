import React, { Component } from "react";

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
            tickets: [
                { id: "1", title: "Logitech G ProX", description: "Designed with gaming in mind...", status: "Open" },
                { id: "2", title: "Logitech G ProX", description: "Designed with gaming in mind...", status: "Open" },
                { id: "3", title: "Logitech G ProX", description: "Designed with gaming in mind...", status: "Open" },
                { id: "4", title: "Logitech G ProX", description: "Designed with gaming in mind...", status: "Open" },
            ],
        };
    }

    render() {
        return (
            <div className="w-full p-6">
                <h2 className="text-3xl italic text-center text-primary mt-10 mb-6">List Tickets</h2>
                <table className="w-full rounded-lg overflow-hidden">
                    <thead>
                        <tr className="text-black border-b-1 border-gray-300 justify-end items-end">
                            <th className="p-3 text-start font-semibold italic text-white">Title</th>
                            <th className="p-3 text-start font-semibold italic">Title</th>
                            <th className="p-3 text-start font-semibold italic">Description</th>
                            <th className="p-3 text-start font-semibold italic">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tickets.map((ticket) => (
                            <tr key={ticket.id} className="border-b border-gray-300 rounded-2xl font-pro hover:bg-gray-50 transition">
                                <td className="p-3">{ticket.id}</td>
                                <td className="p-3">{ticket.title}</td>
                                <td className="p-3">{ticket.description}</td>
                                <td className="p-3">{ticket.status}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default List;
