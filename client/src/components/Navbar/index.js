import { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Cookies from 'js-cookie';
import NavItem from '../NavItem';
import NavButton from '../NavButton';
import './index.css';

const navItemList = [
    {
        id: "HOME",
        displayName: "Home",
        role: ["NEW"],
        path: "/",
    },
    {
        id: "PROFILE",
        displayName: "Profile",
        role: ["USER", "ADMIN"],
        path: "/profile",
    },
    {
        id: "ADMIN",
        displayName: "Admin Panel",
        role: ["ADMIN"],
        path: "/admin",
    },
    {
        id: "LEADERBOARD",
        displayName: "Leaderboard",
        role: ["USER", "ADMIN"],
        path: "/leaderboard",
    },
    {
        id: "CONTRIBUTORS",
        displayName: "Contributors",
        role: ["ANY"],
        path: "/contributors",
    },
]

const navButtonList = [
    {
        id: "SIGNUP",
        displayName: "Join Us",
        role: ["NEW"],
        path: "/signup",
        style:"solid",
    },
    {
        id: "LOGIN",
        displayName: "Login",
        role: ["NEW"],
        path: "/login",
        style:"outline",
    },
    {
        id: "LOGOUT",
        displayName: "Log Out",
        role: ["USER", "ADMIN"],
        path: "/",
        style:"outline",
        onClick: () => {
            Cookies.remove('token')
            Cookies.remove('role')
        },
    },
]

class Navbar extends Component {
    constructor(props) {
        super(props)
        const {pathname} = props.location;
        const tabDetails = navItemList.find(eachNav => eachNav.path === pathname)
        const activeTab = tabDetails !== undefined? tabDetails.id : "";
        this.state = {activeTab}
    }

    onChangeActiveTab = id => {
        this.setState({activeTab: id})
    }

    render() {
        const {pathname} = this.props.location;
        const {activeTab} = this.state;

        const token = Cookies.get('token');
        // const role = Cookies.get('role'); // value is ADMIN or USER
        // const token = "someRandomString"
        const role = 'USER' 
        const userRole = token !== undefined ? role : "NEW";
        const isLoginPage = (pathname === '/login' || pathname === '/signup');
        const loginNavbarStyle = isLoginPage? "navbar-login-page" : ""
        const loginAnchorStyle = isLoginPage? "navbar-anchor-login-page" : ""

        return (
            <>
                <nav className={`navbar-lg ${loginNavbarStyle}`}>
                    <Link className={`navbar-anchor ${loginAnchorStyle}`} to="/">
                        <img className="navbar-logo" src='/images/gdg-logo-small.png' alt="gdg-logo" />
                        {isLoginPage && <p>Google Developer Groups on Campus</p>}
                    </Link>
                    {!isLoginPage && (
                        <ul className="navbar-links">
                            {navItemList.map(eachNav =>
                                <NavItem 
                                    key={eachNav.id} 
                                    isActive={activeTab === eachNav.id} 
                                    userRole={userRole}
                                    NavDetails={eachNav}
                                    onClickChangeActiveTab={this.onChangeActiveTab} 
                                />
                            )}
                            {navButtonList.map(eachButton => 
                                <NavButton
                                    key={eachButton.id}
                                    buttonDetails={eachButton}
                                    userRole={userRole}
                                />
                            )}
                        </ul>
                    )}
                </nav>
            </>
        );
    }
}

export default withRouter(Navbar);
