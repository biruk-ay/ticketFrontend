// @ts-nocheck
import React, { Component } from "react";
import adminRepository from "../../data/repository/admin.repository";
import { useParams } from "react-router";

interface UpdateState {
    id: string;
    status: string;
}

function withRouter(Component) {
    return function WrappedComponent(props) {
        const params = useParams();
        console.log("Matched Route ID:", params.id);
        return <Component {...props} params={params} />;
    };
}

class Update extends Component<UpdateState> {
    constructor(props) {
        super(props);
        console.log("Update Component Rendered with ID:", this.props.params.id);
        this.state = {
            id: this.props.params.id,
            status: "Open",
        };
    }


    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ status: e.target.value });
    };

    handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await adminRepository.update(this.state.status, this.state.id);
            console.log(`Updated Ticket ${this.state.id} to ${this.state.status}`);
            window.location.href = "/admin";
        } catch (error) {
            console.error("Error updating ticket:", error);
        }
    };

    render() {
        return (
            <div className="w-full p-4 flex flex-col items-center">
                <h2 className="text-3xl italic text-primary mt-10 mb-10">Update Ticket</h2>
                <form onSubmit={this.handleSubmit} className="flex flex-col items-center">
                    <div className="flex gap-5">
                        <label className="text-lg">
                            <input type="radio" name="status" value="Open" checked={this.state.status === "Open"} onChange={this.handleChange} /> Open
                        </label>
                        <label className="text-lg">
                            <input type="radio" name="status" value="InProgress" checked={this.state.status === "InProgress"} onChange={this.handleChange} /> In Progress
                        </label>
                        <label className="text-lg">
                            <input type="radio" name="status" value="Closed" checked={this.state.status === "Closed"} onChange={this.handleChange} /> Closed
                        </label>
                    </div>
                    <button type="submit" className="bg-primary text-white px-10 py-2 mt-8 rounded-full hover:bg-green-900">
                        Update Ticket
                    </button>
                </form>
            </div>
        );
    }
}

export default withRouter(Update);
