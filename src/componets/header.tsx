import React from "react";
import { logout, selectUserName } from "../apps/auth/application/slice/auth.slice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useNavigate } from "react-router";

const Header = () => {
  
  const dispatch = useAppDispatch();
  const username = useAppSelector(selectUserName);
  const navigator = useNavigate();
  const handleLogout = async (evt: React.FormEvent) => {
    evt.preventDefault();
    await dispatch(logout());
    navigator('/login')
  }
  return (
      <header className="flex bg-white w-full fixed top-0 left-0 p-3 box-border">
          <div className="font-cursive font-extrabold text-2xl text-primary ml-16">Tickets</div>
          <div className="ml-auto flex items-center space-x-4 mr-16">
    {username ? (
      <>
        <span className="text-black font-pro">Welcome, {username}</span>
        <button
          onClick={handleLogout}
          className="bg-primary font-pro text-white px-5 py-1 rounded-full transition hover:bg-green-900"
          >
          Logout
        </button>
      </>
    ) : (
      <>
        <a
          href="/login"
          className="text-black font-pro hover:text-green-900"
        >
          Login
        </a>
        <a
          href="/signup"
          className="text-black font-pro hover:text-green-900"
        >
          Register
        </a>
      </>
    )}
  </div>
      </header>
  );
}

export default Header;