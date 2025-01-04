import { PiSmileySadDuotone as NotFoundIcon } from "react-icons/pi";
import NavbarWrapper from '../NavbarWrapper'
import './index.css'

const NotFound = () => {
  return (
    <NavbarWrapper className="not-found-countainer">
      <NotFoundIcon className="not-found-icon" />
      <h1 className="not-found-heading">Page Not Found</h1>
    </NavbarWrapper>
  )
}

export default NotFound
