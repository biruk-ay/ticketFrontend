import React from "react";
import Header from "../../../../componets/header";
import { login } from "../../application/slice/auth.slice";
import { connect } from "react-redux";
import Loading from "../../../../componets/loading";
import Ticket from "../../../ticket/presentation/view/Tickets";
import Admin from "../../../admin/presentation/view/Admin";

interface LoginProps {
  role: string | null;
  loading: boolean;
  login: (data: { email: string; password: string }) => void;
  
}

interface LoginState {
  email: string;
  password: string;
}

export class Login extends React.Component<LoginProps, LoginState> {
  state: LoginState = {
    email: "",
    password: "",
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<LoginState, keyof LoginState>);
  };
  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await this.props.login({
      email: this.state.email,
      password: this.state.password,
    });
  };
  
  componentDidUpdate(prevProps: LoginProps) {
    if (prevProps.role !== this.props.role || prevProps.loading !== this.props.loading) {

      if (!this.props.loading) {
        this.forceUpdate();
      }
    }
  }
  
  render(): React.ReactNode {
    const { role, loading } = this.props;

    if (loading && (role===null)) {
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
          <div className="w-full h-full flex flex-row items-center justify-evenly">
            <form className="w-1/2 flex flex-col items-center justify-center" onSubmit={this.handleSubmit}>
              <div className="flex text-black text-4xl italic font-pro-italic">Login</div>
              <div className="text-black text-2xl font-pro mt-20 mr-56">Email</div>
              <input
                name="email"
                type="email"
                className="w-2/5 bg-[#D9D9D9] bg-opacity-50 rounded-lg py-3 pl-1 mt-2"
                onChange={this.handleChange}
              />
              <div className="text-black text-2xl font-pro mt-6 mr-48">Password</div>
              <input
                name="password"
                type="password"
                className="w-2/5 bg-[#D9D9D9] bg-opacity-50 rounded-lg py-3 pl-1 mt-2"
                onChange={this.handleChange}
              />
              <button
                type="submit"
                className="w-1/4 h-8 bg-primary text-white text-lg font-pro rounded-3xl mt-10"
              >
                Login
              </button>
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
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);