import React, { useEffect } from 'react';
import './index.css';
import Home from './pages/home';
import {  Routes, Route, useNavigate } from 'react-router-dom';
import AllTask from './pages/alltask';
import ImportantTask from './pages/importanttask';
import CompletedTask from './pages/completedtask';
import IncompletedTask from './pages/incompletedtask';
import  Signup from './pages/signup';
import  Login from './pages/login';
import {useDispatch, useSelector} from "react-redux";
import { authActions } from './store/auth';

const App = () => {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.Login());
    }
   else if (isLoggedIn === false){
      navigate("/signup");
    }
  
    
  }, []);
  
  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
      
        <Routes>
          <Route exact path="/" element={<Home />} >
          <Route index element={<AllTask />} />
          <Route path="/importanttask" element={<ImportantTask />} />
          <Route path="/completedtask" element={<CompletedTask />} />
          <Route path="/incompletedtask" element={<IncompletedTask />} />
          </Route>
         <Route path="/signup" element={<Signup />}/>
         <Route path="/login" element={<Login />}/>
        </Routes>
      
    </div>
  );
};

export default App;
