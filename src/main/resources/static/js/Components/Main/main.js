import React, {Component} from 'react';
import Profile from './Content/User/profile';
import Dashboard from './Content/Dashboard/dashboard';
import Projectlist from './Content/Project/projectlist';
import Projectform from './Content/Project/projectform';
import Reportlist from './Content/Report/reportlist';
import Printpdf from './Pdf/monthly';
import Reportform from './Content/Report/reportform';
import {Route} from 'react-router-dom';
import Sidebarlink from './Sidebar/sidebar';

export default class Main extends Component
{

    constructor(props){
        super(props);
        this.state = {
            project : {},
            report : {},
            mode : '',
        };
        this.transReportToForm = this.transReportToForm.bind(this);
        this.transProjectToForm = this.transProjectToForm.bind(this);
        this.resetMode = this.resetMode.bind(this);
    }

    resetMode(modul){
        modul === 'report' ? this.setState({report:{},mode:''}) : this.setState({project:{},mode:''});
    }

    transReportToForm(data){
        console.log("data project = "+data.project);
        console.log("data status = "+data.status);
        this.setState({report : data,mode : 'edit'});
        console.log("report state = "+this.state.report);
    }

    transProjectToForm(data){

        this.setState({project : data,mode : 'edit'});
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
                            <Sidebarlink to="/projects" label="Projects"/>
                            <Sidebarlink to="/project" label="New Project"/>
                            <Sidebarlink to="/programmers" label="Programmers"/>
                            <Sidebarlink to="/reports" label="List Report"/>
                            <Sidebarlink to="/report" label="Daily Report"/>
                            <Sidebarlink to="/pdf" label="Print Report"/>
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
                        <Route path="/projects" render={(props) => <Projectlist transfer={this.transProjectToForm} token={this.props.token} />} />
                        <Route path="/project" render={(props) => <Projectform reset={this.resetMode} mode={this.state.mode} project={this.state.project} status={this.props.status} user={this.props.user} token={this.props.token} />} />
                        <Route path="/programmers" render={(props) => <Profile user={this.props.user} token={this.props.token} />} />
                        <Route path="/reports" render={(props) => <Reportlist user={this.props.user} transfer={this.transReportToForm} token={this.props.token} />} />
                        <Route path="/report" render={(props) => <Reportform reset={this.resetMode} mode={this.state.mode} report={this.state.report} status={this.props.status} user={this.props.user} token={this.props.token} />} />
                        <Route path="/pdf" render={(props) => <Printpdf user={this.props.user} token={this.props.token} />} />
                    </div>
                </div>
            </div>
        );
    }
}