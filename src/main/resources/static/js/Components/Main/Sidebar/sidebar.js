/**
 * Created by Bensolo on 4/9/2017.
 */
import React, { Component } from 'react';
import {Link , Route} from 'react-router-dom';

export default ({label, to, activeOnlyWhenExact}) => (
    <Route path={to} exact={activeOnlyWhenExact} children={({match}) => (
        <li className={match ? 'active' : ''}>
            <Link to={to}>{label}</Link>
        </li>
    )}/>
)