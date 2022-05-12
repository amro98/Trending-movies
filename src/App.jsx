import { Routes,Route, useNavigate, Navigate } from 'react-router';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar.jsx';
import Tv from './components/Tv/Tv';
import Movies from './components/Movies/Movies';
import Celebrities from './components/Celebrities/Celebrities';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import {  useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import MovieDetails from './components/MovieDetails/MovieDetails';


function App() {

  let [loginUser,setLoginUser] = useState();

  const isLogin = localStorage.getItem("userToken");


  let navigate = useNavigate();

  function getUserInfo() {
    let encodedToken = localStorage.getItem("userToken");
    let useData = jwtDecode(encodedToken);
    setLoginUser(useData);


  }


  function logOut() {
    localStorage.removeItem('userToken');
    setLoginUser(null);
    navigate('/login');
  }

  useEffect(()=> {
    if(localStorage.getItem("userToken")){
      getUserInfo();
    }
  },[]);





  return (
    <div className='App'>
      <Navbar loginUser={loginUser} logOut={logOut}/>

      <Routes>
      
        <Route path='/' exact element={isLogin? <Home loginUser={loginUser}/>: <Navigate to='/login' />}>
        </Route>
        <Route path='/:media_type/:id' element={ <MovieDetails/>}/>
        <Route path='/tv' element={isLogin? <Tv/>: <Navigate to='/login' />}/>
        <Route path='/movies' element={isLogin? <Movies/>: <Navigate to='/login' />}/>
        <Route path='/celebrities' element={isLogin? <Celebrities/>: <Navigate to='/login' />}/>
        
        <Route path='/register' element={isLogin ? <Navigate to='/home' />:<Register/>}/>
        <Route path='/login' element={isLogin ? <Navigate to='/home' /> :<Login getUserInfo={getUserInfo}/>}/>

      </Routes>


      
      
    </div >
   
  );
}

export default App;
