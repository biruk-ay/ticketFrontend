import React from "react";
import Header from "../../../../componets/header";
import { login, selectLoading, selectUserRole } from "../../application/slice/auth.slice";
import Loading from "../../../../componets/loading";
import Ticket from "../../../ticket/presentation/view/Tickets";
import Admin from "../../../admin/presentation/view/Admin";
import { useAppDispatch, useAppSelector } from "../../../../store/store";

interface FormElements extends HTMLFormControlsCollection {
  emailInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
}

interface LoginFormElements extends HTMLFormElement {
  readonly elements: FormElements
}

const Login = () => {
  const dispatch = useAppDispatch();
  const role = useAppSelector(selectUserRole);
  const loading = useAppSelector(selectLoading);
  const handleSubmit = async (evt: React.FormEvent<LoginFormElements>) => {
    evt.preventDefault();

    const email = evt.currentTarget.elements.emailInput.value;
    const password = evt.currentTarget.elements.passwordInput.value;
    await dispatch(login({email: email, password: password}));
  }

  if(loading) {
    return <Loading />
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
        <div className="w-full h-full flex flex-col-reverse sm:flex-row items-center justify-evenly">
          <form className="w-1/2 flex flex-col items-center justify-center" onSubmit={handleSubmit}>
            <div className="flex text-black text-4xl italic font-pro-italic">Login</div>
            <div className="text-black text-2xl font-pro mt-20 mr-56">Email</div>
            <input
              name="emailInput"
              id="emailInput"
              type="email"
              className="w-full sm:w-2/5 bg-[#D9D9D9] bg-opacity-50 rounded-lg py-3 pl-1 mt-2"
            />
            <div className="text-black text-2xl font-pro mt-6 mr-48">Password</div>
            <input
              name="passwordInput"
              id="passwordInput"
              type="password"
              className="w-full sm:w-2/5 bg-[#D9D9D9] bg-opacity-50 rounded-lg py-3 pl-1 mt-2"
            />
            <button
              type="submit"
              className="w-full sm:w-1/4 h-8 bg-primary text-white text-lg font-pro rounded-3xl mt-10"
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

export default Login;


