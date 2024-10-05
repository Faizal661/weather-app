import React from 'react';
import WeatherSearch from './WeatherSearch';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white p-5 mb-14 shadow-lg rounded-xl">Weather Tracker</h1>
      <div className="bg-gradient-to-r from-violet-500 via-indigo-600 to-blue-600 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <WeatherSearch />
      </div>
    </div>
  );
};

export default App;
