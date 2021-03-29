import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import './App.css';
// import Nav from './Nav'

import CovidApp from './CovidApp'
import Subscribe from './Subscribe'
import Login from './Login'



function App() {
  
  return (
    <div >
      <Router>
        <Switch>
          <Route path='/' exact style={{ backgroundColor: '#d3d3e9' }} >
          <Subscribe />
          </Route>  
          <Route path='/login' component={Login} />
          <Route path='/covidApp' component={CovidApp} />

        </Switch>

      </Router>


    </div>
  );
}

export default App;
