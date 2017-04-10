/**
 * Created by Bensolo on 4/9/2017.
 */
import React, {Component} from 'react';
import Dashboard from './Content/Dashboard/dashboard';
import Reportpage from './Content/Report/reportpage';
import Reportform from './Content/Report/reportform';
import {Route} from 'react-router-dom';
// import Helmet from 'react-helmet';
import Sidebarlink from './Sidebar/sidebar';

export default class Main extends Component {
    handleLogout(event) {
        event.preventDefault();
        $('#formlogout').submit();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 col-md-2 sidebar">
                        <ul className="nav nav-sidebar">
                            <Sidebarlink activeOnlyWhenExact={true} to="/" label="Dashboard"/>
                            <Sidebarlink to="/list" label="Daily Report"/>
                            <Sidebarlink to="/daily" label="Input Daily"/>
                            <li>
                                <a style={{"cursor": "pointer"}} onClick={this.handleLogout.bind(this)}>Logout</a>
                            </li>
                            <form name="formlogout" action="http://localhost:8080/logout" method="post" id="formlogout">
                                {/*<button style={{ marginLeft : '7px',textDecoration: 'none'}} type="submit" className="btn btn-link">Log out</button>*/}
                                <input type="hidden" name="_csrf" value={this.props.token}/>
                            </form>
                        </ul>
                    </div>
                    <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                        <Route exact path="/" component={Dashboard}/>
                        <Route path="/list" component={Reportpage}/>
                        <Route path="/daily" component={Reportform}/>
                    </div>
                </div>
            </div>
        );
    }
}