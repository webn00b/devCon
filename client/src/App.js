import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Landing from './components/layouts/Landing'
import Navbar from './components/layouts/Navbar'
import './App.css';
import { Provider } from 'react-redux';
import store from './store'

const App = () => {
    return (
        <Provider store={store}>
        <Router>
            <>
                <Navbar/>
                <Route exact path='/' component={Landing}/>
            </>
        </Router>
        </Provider>
);
}

export default App;
