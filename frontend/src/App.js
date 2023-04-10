
import './App.css';
import AddCompany from './Components/AddCompany';
import AddWorker from './Components/AddWorker';
import UserRegistration from './Components/UserRegistration';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
function App() {
  const router= createBrowserRouter([
    {path:"/",element:<UserRegistration/>},
    {path:"/addworker/:userId",element:<AddWorker/>},
    {path:"/addcompany/:userId",element:<AddCompany/>},]);
  return (
    <div className="App">
   <RouterProvider router={router} />
  </div>
  );
}

export default App;
