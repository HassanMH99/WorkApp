
import './App.css';
import AddCompany from './Components/AddCompany';
import AddWorker from './Components/AddWorker';
import Login from './Components/Login';
import UserRegistration from './Components/UserRegistration';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WorkerPage from './Components/WorkerPage';
import CompanyPage from './Components/CompanyPage';
function App() {
  const router= createBrowserRouter([
    {path:"/register",element:<UserRegistration/>},
    {path:"/addworker/:userId",element:<AddWorker/>},
    {path:"/addcompany/:userId",element:<AddCompany/>},
    {path:"/login",element:<Login/>},
    {path:"/worker/:id",element:<WorkerPage/>},
    {path:"/company",element:<CompanyPage/>}
  
  ]);
  return (
    <div className="App">
   <RouterProvider router={router} />
  </div>
  );
}

export default App;
