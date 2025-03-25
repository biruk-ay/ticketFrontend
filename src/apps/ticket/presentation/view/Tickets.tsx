import { useState } from "react";
import Header from "../../../../componets/header";
import List from "../componets/List";
import Create from "../componets/Create";

const Ticket = () => {

    const [activeComponent, setActiveComponent] = useState('List');
    const renderComponent = () => {

        if(activeComponent === 'List') {
            return <List />
        } else if (activeComponent === 'Create') {
            return <Create />
        }
        
    }

    return (
        <>
            <Header />
            <div className="flex w-full h-screen">
                <div className="flex flex-col justify-center w-1/12">
                    <button
                        className="flex justify-center mb-2 font-roboto text-primary focus:underline focus:decoration-primary focus:decoration-2 focus:underline-offset-4"
                        onClick={() => setActiveComponent('List')}
                    >
                        List
                    </button>
                    <button
                        className="flex justify-center mb-2 font-roboto text-primary focus:underline focus:decoration-primary focus:decoration-2 focus:underline-offset-4"
                        onClick={() => setActiveComponent('Create')}
                    >
                        Create
                    </button>
                </div>
                <div className="flex w-11/12">{renderComponent()}</div>
            </div>
        </>
    );
}


export default Ticket;
