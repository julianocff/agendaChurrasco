import React from 'react'
import { HashRouter, Route, Redirect } from "react-router-dom";

import Churras from '../churras/churras'
import Login from '../login/login'
import ChurrasFormContainer from '../churras/churrasFormContainer';

export default props => (
    <HashRouter>
        <Route path='/churras' component={Churras} />
        <Route path='/login' component={Login} />
        <Route path='/churras-add' component={ChurrasFormContainer} />
        <Route path='/churras-edit/:id' component={ChurrasFormContainer} />
        <Redirect from='*' to='/churras' />
    </HashRouter>
)