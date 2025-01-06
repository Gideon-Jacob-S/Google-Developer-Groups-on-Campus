import NavbarWrapper from '../NavbarWrapper'
import './index.css'

const Profile = props => {
  const {state} = props.location
  const { isLoginSuccess, isUnauthorized } = state ? state : {}
  console.log(isLoginSuccess, isUnauthorized)

  return (
    <NavbarWrapper>
      <div className="profile-secion">
        <h1>Your Profile</h1>
        <p>
          Welcome to the Google Developer Groups on Campus! We are a community
          of developers and tech enthusiasts who come together to learn, share,
          and grow. Our mission is to foster a collaborative environment where
          students can enhance their skills, network with industry
          professionals, and contribute to open source projects.
        </p>
      </div>
    </NavbarWrapper>
  )
}

export default Profile
