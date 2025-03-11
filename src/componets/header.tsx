import React from "react";
import { connect } from "react-redux";
import { logout } from "../apps/auth/application/slice/auth.slice";

export class Header extends React.Component {
    
    handleLogout = () => {
        this.props.logout();
        window.location.href = "/login";
      };

    render(): React.ReactNode {
        const { isLoggedIn, username } = this.props;

        return (
            <header className="flex bg-white w-full fixed top-0 left-0 p-3 box-border">
                <div className="font-cursive font-extrabold text-2xl text-primary ml-16">Tickets</div>
                <div className="ml-auto flex items-center space-x-4 mr-16">
          {isLoggedIn ? (
            <>
              <span className="text-black font-pro">Welcome, {username}</span>
              <button
                onClick={this.handleLogout}
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
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn, 
    username: state.auth.name,
  });
  
  const mapDispatchToProps = {
    logout,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header);