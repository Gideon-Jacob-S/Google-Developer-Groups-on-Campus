import { Link } from 'react-router-dom';
import Button from '../Button';

import './index.css'

const NavButton = props => {
    const {buttonDetails, userRole} = props
    const {displayName, role, path, style, onClick} = buttonDetails

    if (role.includes(userRole) || role.includes("ANY"))
        return (
            <li>
                <Link className="navbar-anchor" to={path} onClick={onClick}>
                    <Button type={style}>{displayName}</Button>
                </Link>
            </li>
        )
}

export default NavButton;