import { useState } from 'react';
function App() {
  const [count, setcount] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-grey-100">
      <h1 className="text-4xl font-bold mb-4">Counter App</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
        <h2 className="text-5xl font-bold text-blue-600 mb-4">{count}</h2>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={()=> setcount(count - 1)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          Decrement
        </button>

      </div>
    </div>
  );

}
export default App;