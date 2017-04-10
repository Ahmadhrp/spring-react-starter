/**
 * Created by Bensolo on 4/9/2017.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Components/Navbar/navbar'
import Main from './Components/Main/main';
import {BrowserRouter} from 'react-router-dom';
import $ from 'jquery';
// import toastr from 'toastr';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'toastr/build/toastr.css';

class App extends Component
{
    constructor(props) {
        super(props);
        this.state = {csrf:''};
    }

    componentWillMount(){
        this.setState({csrf : $('meta[name="_csrf"]').attr('content')});
        console.log(this.state.csrf);
    }

    render() {
        return (
            <div>
                <Navbar token={this.state.csrf}/>
                <Main token={this.state.csrf}/>
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
