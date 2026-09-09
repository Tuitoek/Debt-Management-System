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
      <h3 className="text-3xl font-semibold text-gray-600  text-center">
        Take control of your finances with smart debt tracking, expense
        management & savings planning
      </h3>
      <p className='font-semibold text-gray-700 text-xl'>Ever wondered why you are in a constant debt cycle? <br /> Come keep track of your finances with us and walk on the road to financial freedom</p>
      
    </div>
  );
}

export default Home;