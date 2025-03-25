import React, { useState } from "react";
import { useNavigate } from "react-router";
import ticketRepository from "../../data/repository/ticket.repository";
import Loading from "../../../../componets/loading";

interface FormElements extends HTMLFormControlsCollection {
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  statusInput: HTMLInputElement;
}

interface TicketFormElements extends HTMLFormElement {
  readonly elements: FormElements
}


const Create = () => {
  const [ loading, isLoading ] = useState(false);
  const navigator = useNavigate();

  const handleSubmit = async (evt: React.FormEvent<TicketFormElements>) => {
    evt.preventDefault();

    const title = evt.currentTarget.elements.titleInput.value;
    const description = evt.currentTarget.elements.descriptionInput.value;
    const status = evt.currentTarget.elements.statusInput.value;
    console.log(title, description, status);
    try {
      isLoading(true);
      await ticketRepository.create(title, description, status);
      navigator('/ticket')
    } catch {
      console.log("Error in creating ticket");
    }

    isLoading(false);

  }

  if (loading) {
    return <Loading />;
  }
  
  return (
    <div className="w-full p-4 justify-center items-center">
      <h2 className="text-3xl italic text-center text-primary mt-10 mb-10">Create Ticket</h2>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
        <div className="text-black text-xl font-pro font-semibold italic mr-56">Title</div>
        <input
          name="title"
          id="titleInput"
          className="w-1/5 bg-[#D9D9D9] bg-opacity-50 rounded-lg py-3 pl-1 mt-2"
          required
        />
        <div className="text-black text-xl font-pro font-semibold italic mt-6 mr-40">Description</div>
        <input
          name="description"
          id="descriptionInput"
          className="w-1/5 bg-[#D9D9D9] bg-opacity-50 border-gray-100 rounded-lg py-8 pl-1 mt-2"
          required
        />
        <div className="text-black text-xl font-pro font-semibold italic mt-6 mb-5 mr-56">Status</div>
        <div className="flex flex-row justify-evenly items-center">
          <div className="flex justify-evenly items-center">
            <input
              type="radio"
              id="statusInput"
              name="status"
              value="Open"
              className="focus:ring-primary focus:ring-2"
            />
            <label className="font-pro text-black text-lg mr-5 ml-1.5">Open</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="statusInput"
              name="status"
              value="InProgress"
              className="focus:ring-primary focus:ring-2 ml-5"
            />
            <label className="font-pro text-black text-lg ml-1.5">InProgress</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="statusInput"
              name="status"
              value="Closed"
              className="focus:ring-primary focus:ring-2 ml-5"
            />
            <label className="font-pro text-black text-lg ml-1.5">Closed</label>
          </div>
        </div>
        <div className="flex">
          <button
            type="submit"
            className="bg-primary font-pro text-white w-full px-10 py-2 mt-8 rounded-full transition hover:bg-green-900"
          >
            {loading ? "Creating..." : "Create Ticket"}
          </button>
        </div>
      </form>
    </div>
  );

}


  


export default Create;