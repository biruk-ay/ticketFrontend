import React from "react";
import adminRepository from "../../data/repository/admin.repository";
import { useNavigate, useParams } from "react-router";

interface FormElements extends HTMLFormControlsCollection {
    statusInput: HTMLInputElement;
  }
  
  interface StatusFormElements extends HTMLFormElement {
    readonly elements: FormElements
  }


const Update = () => {

    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>();
    const handleSubmit = async (evt: React.FormEvent<StatusFormElements>) => {
        evt.preventDefault();
        const status = evt.currentTarget.elements.statusInput.value;
        console.log("Id is: ", id);
        try {
            await adminRepository.update(status, id!)
            navigate("/admin");
        } catch (error) {
            console.error("Error updating ticket: ", error);
        }
    }
    return (
        <div className="w-full p-4 flex flex-col items-center">
            <h2 className="text-3xl italic text-primary mt-10 mb-10">Update Ticket</h2>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div className="flex gap-5">
                    <label className="text-lg">
                        <input type="radio" name="status" value="Open" id="statusInput" /> Open
                    </label>
                    <label className="text-lg">
                        <input type="radio" name="status" value="InProgress" id="statusInput" /> In Progress
                    </label>
                    <label className="text-lg">
                        <input type="radio" name="status" value="Closed" id="statusInput" /> Closed
                    </label>
                </div>
                <button type="submit" className="bg-primary text-white px-10 py-2 mt-8 rounded-full hover:bg-green-900">
                    Update Ticket
                </button>
            </form>
        </div>
    );
}
    



export default Update;
