import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './Routing';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {store}from './Store/index';
import Loader from "./Component/Loader";
import Error from "./Component/Error";
import NavBar from "./Component/NavBar";
import Kitchen from "./container/Kitchen/Kitchen";
ReactDOM.render(<Provider store={store} >
<div>
    <Loader />
    <NavBar />
    <Routing />
    <Error />
    
</div>
</Provider>, document.getElementById('root'));
registerServiceWorker();
