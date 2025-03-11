import React from "react";
import Header from "./header";
import { Link } from "react-router";


export class Landing extends React.Component {

    render(): React.ReactNode {
        
        return (
            <>
            <Header />
            <div className="flex w-full h-screen">
                <div className="justify-center items-center w-full flex flex-col">
                    <div className="font-cursive text-primary text-8xl">Get Your Tickets</div>
                    <div className="flex flex-row justify-evenly font-pro text-black w-1/3 items-center text-lg">
                        <Link className="bg-primary font-pro text-white w-1/5 px-10 py-2 mt-8 rounded-full" to="/login">Login</Link>
                        <Link className="bg-primary font-pro text-white w-1/4 px-10 py-2 mt-8 rounded-full" to="/signup">Register</Link>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
