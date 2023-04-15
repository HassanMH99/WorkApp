
import './App.css';
import AddCompany from './Components/AddCompany';
import AddWorker from './Components/AddWorker';
import Login from './Components/Login';
import UserRegistration from './Components/UserRegistration';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WorkerPage from './Components/Worker/WorkerPage';
import CompanyPage from './Components/CompanyPage';
import HomePage from './Components/Home/HomePage';
import MatchPage from './Components/Match/MatchPage';
import CVInfo from './Components/CvInfo/CVInfo';
function App() {
  const router= createBrowserRouter([
    {path:"/",element:<HomePage/>},
    {path:"/register",element:<UserRegistration/>},
    {path:"/addworker/:userId",element:<AddWorker/>},
    {path:"/addcompany/:userId",element:<AddCompany/>},
    {path:"/login",element:<Login/>},
    {path:"/worker/:id",element:<WorkerPage/>},
    {path:"/company/:id",element:<CompanyPage/>},
    {path:"/match",element:<MatchPage/>},
    {path:"/cv",element:<CVInfo/>},
  
  ]);
  return (
    <div className="App">
   <RouterProvider router={router} />
  </div>
  );
}

export default App;
