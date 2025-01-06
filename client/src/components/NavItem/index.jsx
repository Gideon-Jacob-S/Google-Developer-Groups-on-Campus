import { Link } from 'react-router-dom';
import './index.css';

const NavItem = props => {
    const {isActive, userRole, NavDetails, onClickChangeActiveTab} = props
    const {id, displayName, role, path} = NavDetails
    const activeNavStyle = isActive? "acitve-navbar-link" : ""

    const changeActiveTabId = () => {
        onClickChangeActiveTab(id)
    }

    if (role.includes(userRole) || role.includes("ANY")) 
        return (
            <li>
                <Link className={`navbar-anchor ${activeNavStyle}`} to={path} onClick={changeActiveTabId}>
                    {displayName}
                </Link>
            </li>
        )
}

export default NavItem