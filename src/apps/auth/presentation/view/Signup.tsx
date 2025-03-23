import React from "react";
import Header from "../../../../componets/header";
import { selectLoading, selectUserRole, signup } from "../../application/slice/auth.slice";
import Loading from "../../../../componets/loading";
import Ticket from "../../../ticket/presentation/view/Tickets";
import Admin from "../../../admin/presentation/view/Admin";
import { useAppDispatch, useAppSelector } from "../../../../store/store";


interface FormElements extends HTMLFormControlsCollection {
  nameInput: HTMLInputElement;
  emailInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  roleInput: HTMLInputElement;
}

interface SignupFormElements extends HTMLFormElement {
  readonly elements: FormElements
}



const Signup = () => {

  const dispatch = useAppDispatch();
  const role = useAppSelector(selectUserRole);
  const loading = useAppSelector(selectLoading);

  const handleSubmit = async (evt: React.FormEvent<SignupFormElements>) => {
    evt.preventDefault();

    const name = evt.currentTarget.elements.nameInput.value;
    const email = evt.currentTarget.elements.emailInput.value;
    const password = evt.currentTarget.elements.passwordInput.value;
    const roleIn = evt.currentTarget.elements.roleInput.value;
    console.log(name, email, password, roleIn);
    await dispatch(signup({name: name, email: email, password: password, role: roleIn}))
    
  }

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
        <div className="w-full h-full flex flex-col-reverse sm:flex-row-reverse mt-8 sm:mt-0 items-center justify-evenly">
          <form className="w-1/2 flex flex-col items-center justify-center" onSubmit={handleSubmit}>
              <div className="flex text-black text-4xl italic font-pro-italic">
                  Create Account
              </div>
              <div className="text-black text-2xl font-pro mt-20 mr-56">Name</div>
              <input name="nameInput" id="nameInput" className="w-full sm:w-2/5 bg-[#D9D9D9] bg-opacity-50 rounded-lg py-3 pl-1 mt-2" />
              <div className="text-black text-2xl font-pro mt-6 mr-56">Email</div>
              <input name="emailInput" id="emailInput" className="w-full sm:w-2/5 bg-[#D9D9D9] bg-opacity-50 rounded-lg py-3 pl-1 mt-2" />
              <div className="text-black text-2xl font-pro mt-6 mr-48">Password</div>
              <input name="passwordInput" id="passwordInput" className="w-full sm:w-2/5 bg-[#D9D9D9] bg-opacity-50 rounded-lg py-3 pl-1 mt-2" />
              <div className="text-black text-2xl font-pro mt-6 mr-56">Role</div>
              <div className="flex flex-row justify-evenly items-center">
                  <div className="flex justify-evenly items-center">
                      <input type="radio" id="roleInput" name="role" value="user" className="focus:ring-primary focus:ring-2" />
                      <label className="font-pro text-black text-lg mr-5 ml-1.5">User</label>
                  </div>
                  <div className="flex items-center">
                      <input type="radio" id="roleInput" name="role" value="admin" className="focus:ring-primary focus:ring-2 ml-5" />
                      <label className="font-pro text-black text-lg ml-1.5">Admin</label>
                  </div>
              </div>
              <button type="submit" className="w-full sm:w-1/4 h-8 bg-primary text-white text-lg font-pro rounded-3xl mt-10">Create</button>
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

export default Signup;