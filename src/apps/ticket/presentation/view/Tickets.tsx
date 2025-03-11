// @ts-nocheck
import { Component } from "react";
import Header from "../../../../componets/header";
import List from "../componets/List";
import Create from "../componets/Create";
interface AdminState {
    activeComponent: "List" | "Create";
    selectedId: string | null;
}

class Ticket extends Component<{}, AdminState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activeComponent: "List",
            selectedId: null,
        };
    }

    setActiveComponent = (component: "List" | "Create", id: string | null = null) => {
        this.setState({ activeComponent: component, selectedId: id });
    };

    renderComponent = () => {
        const { activeComponent } = this.state;
        if (activeComponent === "List") {
            return <List onEdit={this.setActiveComponent} />;
        } else if (activeComponent === "Create") {
            return <Create />;
        }
    };

    render() {
        return (
            <>
                <Header />
                <div className="flex w-full h-screen">
                    <div className="flex flex-col justify-center w-1/12">
                        <button
                            className="flex justify-center mb-2 font-roboto text-primary focus:underline focus:decoration-primary focus:decoration-2 focus:underline-offset-4"
                            onClick={() => this.setActiveComponent("List")}
                        >
                            List
                        </button>
                        <button
                            className="flex justify-center mb-2 font-roboto text-primary focus:underline focus:decoration-primary focus:decoration-2 focus:underline-offset-4"
                            onClick={() => this.setActiveComponent("Create")}
                        >
                            Create
                        </button>
                    </div>
                    <div className="flex w-11/12">{this.renderComponent()}</div>
                </div>
            </>
        );
    }
}

export default Ticket;
