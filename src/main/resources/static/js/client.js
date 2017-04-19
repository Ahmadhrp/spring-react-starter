/**
 * Created by Bensolo on 4/9/2017.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Components/Navbar/navbar'
import Main from './Components/Main/main';
import {BrowserRouter} from 'react-router-dom';
import $ from 'jquery';
import toastr from 'toastr';
import 'toastr/build/toastr.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {csrf: '', user: {}, status:{}};
    }

    componentWillMount() {
        this.setState({csrf: $('meta[name="_csrf"]').attr('content')});
        $.ajax({url: "http://10.10.5.112:8080/creden"}).then(data =>
            this.setState({user: data}));
        $.ajax({url: "http://10.10.5.112:8080/api/statuses"}).then(data =>
            this.setState({status: data._embedded.statuses}));
        toastr.options = {
            "positionClass": "toast-bottom-right",
            "showMethod": "slideDown"
        }
    }

    render() {
        return (
            <div>
                <Navbar user={this.state.user} token={this.state.csrf}/>
                <Main user={this.state.user} status={this.state.status} token={this.state.csrf}/>
            </div>
        );

    }
}
ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    ,
    document.getElementById('root'));
