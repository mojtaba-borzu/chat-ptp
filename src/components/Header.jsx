import { LogOut } from 'react-feather'
import { useAuth } from '../utils/AuthContext'
const Header = () => {
  const { user, handleUserLogout } = useAuth()
  return (
    <div id="header--wrapper">
      {user ? (
        <>
          welcome {user.name}{' '}
          <LogOut onClick={handleUserLogout} className="header--link" />{' '}
        </>
      ) : (
        <button>Login</button>
      )}
    </div>
  )
}

export default Header
