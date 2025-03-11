// @ts-nocheck
import React, { Component } from "react";
import { Navigate } from "react-router";
import ticketRepository from "../../data/repository/ticket.repository";
import Loading from "../../../../componets/loading";
interface CreateState {
  title: string;
  description: string;
  status: string;
  loading: boolean;
  error: string | null;
  redirectToList: boolean;
}

class Create extends Component<{}, CreateState> {
  state: CreateState = {
    title: "",
    description: "",
    status: "Open",
    loading: false,
    error: null,
    redirectToList: false,
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value } as Pick<CreateState, keyof CreateState>);
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ loading: true, error: null });

    const { title, description, status } = this.state;

    try {
      await ticketRepository.create(title, description, status);
      this.setState({ redirectToList: true });
    } catch {
      this.setState({ error: "Failed to create ticket. Please try again.", loading: false });
    }
  };

  render() {
    const { title, description, status, loading, error, redirectToList } = this.state;

    if (redirectToList) {
      return <Navigate to="/ticket" />;
    }

    if (loading) {
      return <div><Loading /></div>;
    }

    return (
      <div className="w-full p-4 justify-center items-center">
        <h2 className="text-3xl italic text-center text-primary mt-10 mb-10">Create Ticket</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={this.handleSubmit} className="flex flex-col justify-center items-center">
          <div className="text-black text-xl font-pro font-semibold italic mr-56">Title</div>
          <input
            name="title"
            value={title}
            onChange={this.handleChange}
            className="w-1/5 bg-[#D9D9D9] bg-opacity-50 rounded-lg py-3 pl-1 mt-2"
            required
          />
          <div className="text-black text-xl font-pro font-semibold italic mt-6 mr-40">Description</div>
          <input
            name="description"
            value={description}
            onChange={this.handleChange}
            className="w-1/5 bg-[#D9D9D9] bg-opacity-50 border-gray-100 rounded-lg py-8 pl-1 mt-2"
            required
          />
          <div className="text-black text-xl font-pro font-semibold italic mt-6 mb-5 mr-56">Status</div>
          <div className="flex flex-row justify-evenly items-center">
            <div className="flex justify-evenly items-center">
              <input
                type="radio"
                id="Open"
                name="status"
                value="Open"
                checked={status === "Open"}
                onChange={this.handleChange}
                className="focus:ring-primary focus:ring-2"
              />
              <label className="font-pro text-black text-lg mr-5 ml-1.5">Open</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="InProgress"
                name="status"
                value="InProgress"
                checked={status === "InProgress"}
                onChange={this.handleChange}
                className="focus:ring-primary focus:ring-2 ml-5"
              />
              <label className="font-pro text-black text-lg ml-1.5">InProgress</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="Closed"
                name="status"
                value="Closed"
                checked={status === "Closed"}
                onChange={this.handleChange}
                className="focus:ring-primary focus:ring-2 ml-5"
              />
              <label className="font-pro text-black text-lg ml-1.5">Closed</label>
            </div>
          </div>
          <div className="flex">
            <button
              type="submit"
              className="bg-primary font-pro text-white w-full px-10 py-2 mt-8 rounded-full transition hover:bg-green-900"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Ticket"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Create;