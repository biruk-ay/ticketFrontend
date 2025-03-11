// @ts-nocheck
import React from "react";
import Header from "../../../../componets/header";
import List from "../componets/List";
import Update from "../componets/Update";
interface AdminState {
    activeComponent: "List" | "Update";
    selectedId: string | null;
}

class Admin extends React.Component<object, AdminState> {
    constructor(props: object) {
        super(props);
        this.state = {
            activeComponent: "List",
            selectedId: null,
        };
    }

    setActiveComponent = (component: "List" | "Update", id: string | null = null) => {
        this.setState({ activeComponent: component, selectedId: id });
    };

    renderComponent = () => {
        const { activeComponent, selectedId } = this.state;
        if (activeComponent === "List") { 
            return <List onEdit={this.setActiveComponent} />;
        } else if (activeComponent === "Update" && selectedId) {
            return <Update id={selectedId} onBack={() => this.setActiveComponent("List")} />;
        }
    };

    render() {
        return (
            <>
                <Header />
                <div className="flex w-full h-screen">
                    <div className="flex w-11/12">{this.renderComponent()}</div>
                </div>
            </>
        );
    }
}

export default Admin;
