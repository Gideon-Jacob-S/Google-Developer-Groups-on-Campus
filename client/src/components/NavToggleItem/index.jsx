import { Link } from 'react-router-dom';
import './index.css';

const renderNavItem = (props) => {
    const {activeNavStyle, path, onNavigate, displayName} = props
    return (
        <li className='navbar-toggle-item'>
            <Link className={`navbar-anchor ${activeNavStyle}`} to={path} onClick={onNavigate}>
                {displayName}
            </Link>
        </li>
    )
}

const NavToggleItem = props => {
    const {type} = props 

    if (type === "link") {
        const {isActive, userRole, NavDetails, onClickChangeActiveTab} = props
        const {id, displayName, role, path} = NavDetails
        const activeNavStyle = isActive? "acitve-navbar-toggle-link" : ""
    
        const onNavigate = () => {
            onClickChangeActiveTab(id)
        }

        if (role.includes(userRole) || role.includes("ANY")) 
            return renderNavItem({activeNavStyle, path, onNavigate, displayName})
    
    } else {
        const {buttonDetails, userRole, history} = props
        const {displayName, role, path, onClick} = buttonDetails
        const onNavigate = () => {
            onClick(history)
        }

        if (role.includes(userRole) || role.includes("ANY")) 
            return renderNavItem({path, onNavigate, displayName})
    }

        

}

export default NavToggleItem