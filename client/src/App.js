import React, { createContext , useReducer} from 'react';
import "./App.css";
import {Route , Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Logout from './components/Logout';
import Singup from './components/Singup';
import Error from './components/Error';
import { initialState , reducer } from '../src/reducer/UseReducer';

export const userContext = createContext();


const Routing = () =>{
  return(
    <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/about' component={About} />
    <Route exact path='/contact' component={Contact} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/singup' component={Singup} />
    <Route exact path='/logout' component={Logout} />
    <Route component={Error} />
  </Switch>
  )
}


const App = () =>{

  

  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <>
    <userContext.Provider value={{state , dispatch}}>
      <Navbar />
      <Routing />
    </userContext.Provider>
    </>
  )

};

export default App;