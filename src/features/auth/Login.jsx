import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from './authApiSlice';
import { setIsLoggedIn } from './authSlice';
import { useDispatch } from 'react-redux';
import Spinner from '../../components/Spinner';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = { username, password };
    try {
      await login(credentials).unwrap();
      dispatch(setIsLoggedIn({ username }));
      navigate('/');
    } catch (err) {
      setErrMsg(err.data.message);
      setShowError(true);
    }
    setUsername('');
    setPassword('');
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <div className={showError ? 'text-center text-secondary' : 'hidden'}>
          {errMsg}
        </div>
        <div className="form-control">
          <label className="input-group">
            <span className="w-full">Username</span>
            <input
              type="text"
              className="input input-bordered"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group">
            <span className="w-full">Password</span>
            <input
              type="password"
              className="input input-bordered"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
