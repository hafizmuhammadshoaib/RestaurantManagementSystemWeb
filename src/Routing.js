import React, { Component } from 'react';
import {
   Router,
    Route,
    Link,
    Switch,
    withRouter,
} from 'react-router-dom';
//   import Home from './container/Home/Home';
//   import Donor from './container/Donor/Donor';
import SignIn from './container/SignIn/SignIn';
import SignUp from './container/SignUp/SignUp';
import Home from './container/Home/Home';
import { connect } from 'react-redux';
import History from './Component/History'

//   import Needer from './container/Needer/Needer';

class Routing extends Component {
    render() {
        return (
            <Router history= {History}>
                <Switch>
                    {/* <ul>
                        <li><Link to="/" >Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul> */}
                    <Route exact path="/" component={SignIn} />
                    <Route path="/signUp" component={SignUp} />
                    {/* <Route path="/donor" component={Donor} />
                    <Route path="/needer" component={Needer} />*/}
                        <Route path="/home" component={Home} />
                </Switch>
            </Router>
        )
    }
}

export default Routing;