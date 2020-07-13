import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Landing from './components/layouts/Landing'
import Navbar from './components/layouts/Navbar'
import Register from './components/auth/Register'
import './App.css';
import {Provider} from 'react-redux';
import store from './store'
import Login from './components/auth/Login';
import Alert from "./components/layouts/Alert";
import {loadUser} from "./reducers/authReducer";
import setAuthToken from "./utils/setAuthToken";

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

                    <section className={"container"}>
                        <Alert/>
                        <Switch>
                            <Route exact path='/register' component={Register}/>
                            <Route exact path='/login' component={Login}/>
                        </Switch>
                    </section>
                </>
            </Router>
        </Provider>
    );
}

export default App;
