import { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

import Cookies from 'js-cookie';
import { IoMenu as MenuIcon } from "react-icons/io5";

import NavItem from '../NavItem';
import NavToggleItem from '../NavToggleItem';
import NavButton from '../NavButton';
import Button from '../Button';

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
        path: '/signup',
        style:"solid",
        onClick: history => {
            history.push('/signup')
        },
    },
    {
        id: "LOGIN",
        displayName: "Login",
        role: ["NEW"],
        path: '/login',
        style:"outline",
        onClick: history => {
            history.push('/login')
        },
    },
    {
        id: "LOGOUT",
        displayName: "Log Out",
        role: ["USER", "ADMIN"],
        path: '/',
        style:"outline",
        onClick: history => {
            Cookies.remove('token')
            Cookies.remove('role')
            history.push("/")
        },
    },
]

class Navbar extends Component {
    constructor(props) {
        super(props)
        const {pathname} = props.location;
        const tabDetails = navItemList.find(eachNav => eachNav.path === pathname)
        const activeTab = tabDetails !== undefined? tabDetails.id : "";
        this.state = {activeTab, showMenu: false}
    }

    onChangeActiveTab = id => {
        this.setState({activeTab: id})
    }

    toggleNavMenu = () => {
        this.setState(prevState => ({showMenu: !prevState.showMenu}))
    }

    render() {
        const {pathname} = this.props.location;
        const {history} = this.props;
        const {activeTab, showMenu} = this.state;

        const token = Cookies.get('token');
        const role = Cookies.get('role'); // value is ADMIN or USER
        // const token = "someRandomString"
        // const role = 'USER' 
        // const role = 'ADMIN' 
        const userRole = token !== undefined ? role : "NEW";
        const isLoginPage = (pathname === '/login' || pathname === '/signup');
        const loginNavbarStyle = isLoginPage? "navbar-login-page" : ""
        const loginAnchorStyle = isLoginPage? "navbar-anchor-login-page" : ""

        return (
            <>
                <nav className={`navbar ${loginNavbarStyle}`}>
                    <Link className={`navbar-anchor ${loginAnchorStyle}`} to="/">
                        <img className="navbar-logo" src='/images/gdg-logo-small.png' alt="gdg-logo" />
                        {isLoginPage && <p className='navbar-logo-name-md'>Google Developer Groups on Campus</p>}
                        {isLoginPage && <p className='navbar-logo-name'>GDGoC</p>}
                    </Link>

                    {!isLoginPage && (
                        <Button type="outline" className="navbar-menu-button" onClick={this.toggleNavMenu}>
                            <MenuIcon className='navbar-menu-button-icon' />
                        </Button>
                    )}

                    {!isLoginPage && (
                        <ul className="navbar-links-lg">
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
                                    history={history}
                                />
                            )}
                        </ul>
                    )}
                </nav>

                {!isLoginPage && showMenu && (
                    <ul id="toggleNavMenu" className="navbar-links d-none">
                        <hr className='navbar-seperator' />
                        {navItemList.map(eachNav =>
                            <NavToggleItem 
                                key={eachNav.id}
                                type="link"
                                isActive={activeTab === eachNav.id} 
                                NavDetails={eachNav}
                                userRole={userRole}
                                onClickChangeActiveTab={this.onChangeActiveTab} 
                            />
                        )}
                        {navButtonList.map(eachButton => 
                            <NavToggleItem
                                key={eachButton.id}
                                type="button"
                                buttonDetails={eachButton}
                                userRole={userRole}
                                history={history}
                            />
                        )}
                    </ul>
                )}
            </>
        );
    }
}

export default withRouter(Navbar);
