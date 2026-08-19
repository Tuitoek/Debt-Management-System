import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="p-10 flex 
    justify-content-center
     flex-col items-center gap-10 text-center">
     <h1 className="text-transparent bg-clip-text 
      bg-gradient-to-r from-blue-600 to-green-500 
      text-6xl font-bold align-center">
        Debt Management System
      </h1>
      <h3 className="text-3xl font-semibold text-gray-600 text-center">
        Take control of your finances with smart debt tracking, expense
        management & savings planning
      </h3>
      <div className="mt-6 flex gap-4 justify-center">
        <Link to="/login" className="px-4 py-2 bg-blue-900 text-white rounded">Log In</Link>
        <Link to="/signup" className="px-4 py-2 bg-green-700 text-white rounded">Sign Up</Link>
      </div>
    </div>
  );
}

export default Home;