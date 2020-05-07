import React from 'react';
import './App.css';
import Dashboard from './component/dashboard/Dashboard.js'
import Raw from './component/raw/index'
import VisLineChart from "./component/VisLineChart";
import VisBarChart from "./component/VisBarChart";
import Add from "./component/raw/Add"

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
       <BrowserRouter>
        <div>
            <Switch>
             <Route path="/" component={Dashboard} exact/>
             <Route path="/raw" component={Raw} exact/>
             <Route path="/add" component={Add} exact/>
             <Route path="/vis" component={VisLineChart} exact/>
             <Route path="/barchart" component={VisBarChart} exact/>
            <Route component={Error}/>
           </Switch>
        </div>
      </BrowserRouter>


  );
}

export default App;
