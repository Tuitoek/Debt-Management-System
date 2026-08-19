import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold">Debt Management System</h1>
      <p className="text-xl mt-4">
        Take control of your finances with smart debt tracking, expense management & savings planning
      </p>
      <div className="mt-6 flex gap-4 justify-center">
        <Link to="/login" className="px-4 py-2 bg-blue-900 text-white rounded">Log In</Link>
        <Link to="/signup" className="px-4 py-2 bg-green-700 text-white rounded">Sign Up</Link>
      </div>
    </div>
  );
}

export default Home;