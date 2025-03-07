import React from "react";
import { connect } from "react-redux";
import { logout } from "../apps/auth/application/slice/auth.slice";
import { Navigate } from "react-router";

export class Header extends React.Component {
    state = {
        shouldRedirect: false,
      };

    
    handleLogout = () => {
        this.props.logout();
        this.setState({ shouldRedirect: true });
      };

    render(): React.ReactNode {
        const { isLoggedIn, username } = this.props;
        const { shouldRedirect } = this.state;

        if (shouldRedirect) {
          return <Navigate to="/login" />;
        }
        return (
            <header className="flex bg-white w-full fixed top-0 left-0 p-3 box-border">
                <div className="font-cursive font-extrabold text-2xl text-primary ml-16">Tickets</div>
                <div className="ml-auto flex items-center space-x-4 mr-16">
          {isLoggedIn ? (
            <>
              <span className="text-gray-700">Welcome, {username}</span>
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
                className="text-gray-700 hover:text-primary"
              >
                Login
              </a>
              <a
                href="/signup"
                className="text-gray-700 hover:text-primary"
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