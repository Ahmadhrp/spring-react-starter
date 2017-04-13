/**
 * Created by Bensolo on 4/9/2017.
 */
import React, {Component} from 'react';
import Profile from './Content/Dashboard/profile';
import Dashboard from './Content/Dashboard/dashboard';
import Reportlist from './Content/Report/reportlist';
import Reportform from './Content/Report/reportform';
import {Route} from 'react-router-dom';
import Sidebarlink from './Sidebar/sidebar';

export default class Main extends Component
{

    constructor(props){
        super(props);
        this.state = {
            report : {},
            mode : '',
        }
        this.transValueToForm = this.transValueToForm.bind(this);
    }

    transValueToForm(data){
        this.setState({report : data,mode : 'edit'});
    }

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
                            <Sidebarlink to="/profile" label="Profile"/>
                            <Sidebarlink to="/list" label="Daily Report"/>
                            <Sidebarlink to="/daily" label="Input Daily"/>
                            <li>
                                <a style={{"cursor": "pointer"}} onClick={this.handleLogout.bind(this)}>Logout</a>
                            </li>
                            <form name="formlogout" action="http://localhost:8080/logout" method="post" id="formlogout">
                                <input type="hidden" name="_csrf" value={this.props.token}/>
                            </form>
                        </ul>
                    </div>
                    <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                        <Route exact path="/" render={(props) => <Dashboard user={this.props.user} token={this.props.token} />} />
                        <Route path="/profile" render={(props) => <Profile user={this.props.user} token={this.props.token} />} />
                        <Route path="/daily" render={(props) => <Reportform mode={this.state.mode} report={this.state.report} status={this.props.status}
                                                                            user={this.props.user} token={this.props.token} />} />
                        <Route path="/list" render={(props) => <Reportlist transfer={this.transValueToForm} token={this.props.token} />} />
                    </div>
                </div>
            </div>
        );
    }
}