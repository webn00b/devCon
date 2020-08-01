import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Landing from './components/layouts/Landing'
import Navbar from './components/layouts/Navbar'
import './App.css';
import {Provider} from 'react-redux';
import store from './store'
import {loadUser} from "./reducers/authReducer";
import setAuthToken from "./utils/setAuthToken";
import Routes from "./components/routing/Routes";

if(localStorage.token){
    setAuthToken(localStorage.token)
}

const App = () => {
    useEffect(()=>{
        store.dispatch(loadUser())
    },[])
    return (
        <Provider store={store}>
            <Router>
                <>
                    <Navbar/>
                    <Route exact path='/' component={Landing}/>
                    <Route component={Routes} />

                </>
            </Router>
        </Provider>
    );
}

export default App;
