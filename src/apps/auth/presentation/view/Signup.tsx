// @ts-nocheck
import React from "react";
import Header from "../../../../componets/header";
import { signup } from "../../application/slice/auth.slice";
import { connect } from "react-redux";
import Loading from "../../../../componets/loading";
import Ticket from "../../../ticket/presentation/view/Tickets";
import Admin from "../../../admin/presentation/view/Admin";

interface SignupProps {
  role: string | null;
  loading: boolean;
  signup: (data: { name: string; email: string; password: string; role: string }) => void;
}

interface SignupState {
  name: string;
  email: string;
  password: string;
  role: string;
}


export class Signup extends React.Component {
  state: SignupState = {
    name: "",
    email: "",
    password: "",
    role: ""
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<SignupState, keyof SignupState>);
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    await this.props.signup({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role
    });
  };
  

  componentDidUpdate(prevProps: SignupProps) {
    if (prevProps.role !== this.props.role || prevProps.loading !== this.props.loading) {
  
      if (!this.props.loading) {
        this.forceUpdate();
      }
    }
  }
  
  
  
  
  render(): React.ReactNode {
    const { role, loading } = this.props;
    if (loading) {
      return <Loading />;
    }

    if (role === "user") {
      return <Ticket />;
    }

    if (role === "admin") {
      return <Admin />;
    }
    return (
      <>
        <Header />
        <div className="w-screen h-screen bg-white">
          <div className="w-full h-full flex flex-row-reverse items-center justify-evenly">
            <form className="w-1/2 flex flex-col items-center justify-center" onSubmit={this.handleSubmit}>
                <div className="flex text-black text-4xl italic font-pro-italic">
                    Create Account
                </div>
                <div className="text-black text-2xl font-pro mt-20 mr-56">Name</div>
                <input name="name" className="w-2/5 bg-[#D9D9D9] bg-opacity-50 rounded-lg py-3 pl-1 mt-2" onChange={this.handleChange} />
                <div className="text-black text-2xl font-pro mt-6 mr-56">Email</div>
                <input name="email" className="w-2/5 bg-[#D9D9D9] bg-opacity-50 rounded-lg py-3 pl-1 mt-2" onChange={this.handleChange}/>
                <div className="text-black text-2xl font-pro mt-6 mr-48">Password</div>
                <input name="password" className="w-2/5 bg-[#D9D9D9] bg-opacity-50 rounded-lg py-3 pl-1 mt-2" onChange={this.handleChange}/>
                <div className="text-black text-2xl font-pro mt-6 mr-56">Role</div>
                <div className="flex flex-row justify-evenly items-center">
                    <div className="flex justify-evenly items-center">
                        <input type="radio" id="user" name="role" value="user" className="focus:ring-primary focus:ring-2" onChange={this.handleChange}/>
                        <label className="font-pro text-black text-lg mr-5 ml-1.5">User</label>
                    </div>
                    <div className="flex items-center">
                        <input type="radio" id="admin" name="role" value="admin" className="focus:ring-primary focus:ring-2 ml-5" onChange={this.handleChange}/>
                        <label className="font-pro text-black text-lg ml-1.5">Admin</label>
                    </div>
                </div>
                <button type="submit" className="w-1/4 h-8 bg-primary text-white text-lg font-pro rounded-3xl mt-10">Create</button>
            </form>
            <div className="w-1/2 flex flex-col items-center justify-center">
                <div className="font-cursive font-extrabold text-8xl text-primary">Tickets</div>
                <div className="font-pro font-extrabold text-xl text-black">Get Your Tickets</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  role: state.auth.role,
  loading: state.auth.loading,
});

const mapDispatchToProps = {
  signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);