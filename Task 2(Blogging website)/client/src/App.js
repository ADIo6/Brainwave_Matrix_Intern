// import logo from './logo.svg';
// import './App.css';
import { useState } from 'react';

import DataProvider from './context/DataProvider';

import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';



// components
import Login from './component/account/Login'
import Home from './component/home/Home';
import Header from './component/header/Header';
import CreatePost from './component/create/CreatePost';


const PrivateRoute = ({ isAuthenticated , ...props}) => {
  
  return isAuthenticated?
  <>
  <Header/>
  <Outlet />
  </>
  :<Navigate replace to = '/login' />
}

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);


  return (
    <DataProvider>
      <BrowserRouter>
        
          <div style = {{marginTop: 60}}>
            <Routes>
              <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />

                <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
                  <Route path='/' element={<Home/>} />
                </Route>


                <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
                  <Route path='/create' element={<CreatePost/>} />
                </Route>




            </Routes>
          </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
