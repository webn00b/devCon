import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Landing from './components/layouts/Landing'
import Navbar from './components/layouts/Navbar'
import './App.css';


const App = () => {
    return (
        <Router>
            <>
                <Navbar/>
                <Route exact path='/' component={Landing}/>
            </>
        </Router>

);
}

export default App;
