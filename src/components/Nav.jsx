import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../features/auth/authSlice';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';

const Nav = () => {
  const { isLoggedIn, username } = useSelector(selectAuthState);

  const [sendLogout] = useSendLogoutMutation();

  return (
    <div className="navbar bg-neutral text-neutral-content flex justify-between">
      <div>
        <Link to="/">
          <span className="btn btn-ghost normal-case text-xl">
            {isLoggedIn ? `Hello ${username}` : 'Todo'}
          </span>
        </Link>
      </div>
      <div className={isLoggedIn ? 'hidden' : 'flex gap-2'}>
        <Link to="login">
          <button className="btn btn-primary">Log In</button>
        </Link>
        <Link to="register">
          <button className="btn btn-secondary">Sign UP</button>
        </Link>
      </div>
      <div className={isLoggedIn ? 'flex gap-2' : 'hidden'}>
        <Link to="/create">
          <button className="btn btn-primary">New Todo</button>
        </Link>
        <button className="btn btn-secondary" onClick={sendLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Nav;
