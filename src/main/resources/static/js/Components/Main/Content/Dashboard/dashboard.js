/**
 * Created by Bensolo on 4/9/2017.
 */
import React, {Component} from 'react';
import Programmer from './programmer';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {counter: 0, employees: []};
        this.fetchProgrammer = this.fetchProgrammer.bind(this);
    }

    fetchProgrammer() {
        $.ajax({
            url: "http://localhost:8080/api/employees",
        }).then((data,prevState) => this.setState({
            employees: data._embedded.employees ,
            counter: prevState + 1
        }));
    }

    componentWillMount() {
        this.fetchProgrammer();
    }

    render() {
        return (
            <div>
                <h1 className="page-header">Selamat Datang, <span>{this.props.user.username}</span></h1>
                <div className="row placeholders">
                    {
                        this.state.employees.map((employee, index) =>
                            <Programmer key={index} name={employee.name} age={employee.age} years={employee.years}
                                        links={employee._links}/>)
                    }
                </div>
                <h2 className="sub-header">Section</h2>
                <div>
                    Development Mode
                </div>
            </div>
        );
    }
}