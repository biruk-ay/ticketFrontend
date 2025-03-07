import React, { Component } from "react";

interface UpdateProps {
    id: string;
    onBack: () => void;
}

interface UpdateState {
    name: string;
}

class Update extends Component<UpdateProps, UpdateState> {
    constructor(props: UpdateProps) {
        super(props);
        this.state = {
            name: `User ${props.id}`, 
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: e.target.value });
    };

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Updated User ${this.props.id}: ${this.state.name}`);
        this.props.onBack(); 
    };

    render() {
        return (
            <div className="w-full p-4 justify-center items-center">
                <h2 className="text-3xl italic text-center text-primary mt-10 mb-10">Update Ticket</h2>
                <form onSubmit={this.handleSubmit} className="flex flex-col justify-center items-center">
                <div className="flex flex-row justify-evenly items-center">
                    <div className="flex justify-evenly items-center">
                        <input type="radio" id="Open" name="status" value="Open" className="focus:ring-primary focus:ring-2"/>
                        <label className="font-pro text-black text-lg mr-5 ml-1.5">Open</label>
                    </div>
                    <div className="flex items-center">
                        <input type="radio" id="InProgress" name="status" value="InProgress" className="focus:ring-primary focus:ring-2 ml-5"/>
                        <label className="font-pro text-black text-lg ml-1.5">InProgress</label>
                    </div>
                    <div className="flex items-center">
                        <input type="radio" id="Closed" name="status" value="Closed" className="focus:ring-primary focus:ring-2 ml-5"/>
                        <label className="font-pro text-black text-lg ml-1.5">Closed</label>
                    </div>
                </div>
                    <div className="flex">
                        <button type="submit" className="bg-primary font-pro text-white w-full px-10 py-2 mt-8 rounded-full transition hover:bg-green-900"
                        >
                            Update Ticket
                        </button>
                        
                    </div>
                </form>
            </div>
        );
    }
}

export default Update;
