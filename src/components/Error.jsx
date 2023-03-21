import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen">
      <h1 className="text-4xl">Error 404: Page Not Found!</h1>
      <Link to="/">
        <a className="btn btn-ghost normal-case text-xl underline">Go Home</a>
      </Link>
    </div>
  );
};

export default Error;
