import Button from '../Button';
import './index.css'

const NavButton = props => {
    const {buttonDetails, userRole, history} = props
    const {displayName, role, style, onClick} = buttonDetails
    const onNavigate = () => {
        onClick(history)
    }

    if (role.includes(userRole) || role.includes("ANY"))
        return (
            <li>
                <Button type={style} onClick={onNavigate}>
                    {displayName}
                </Button>
            </li>
        )
}

export default NavButton;