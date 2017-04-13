/**
 * Created by Bensolo on 4/9/2017.
 */
import React, {Component} from 'react';
import Programmer from './programmer';

export default class Team extends Component {

    constructor(props) {
        super(props);
        this.state = {counter: 0, employees: []};
        this.fetchProgrammer = this.fetchProgrammer.bind(this);
    }

    fetchProgrammer() {
        $.ajax({
            url: "http://localhost:8080/api/userses",
        }).then((data, prevState) => this.setState({
            employees: data._embedded.userses,
            counter: prevState + 1
        }));
    }

    componentWillMount() {
        this.fetchProgrammer();
    }

    render() {
        return (
            <div>
                <h1 className="page-header">Team Member</h1>
                <div className="row placeholders">
                    <div className="ui three stackable cards">
                        {
                            this.state.employees.map((employee, index) =>
                                <Programmer key={index} name={employee.nama} age={employee.age}
                                            links={employee._links}/>)
                        }
                    </div>
                </div>
                <h2 className="sub-header">Section</h2>
                <div>
                    Development Mode
                </div>
            </div>
        );
    }
}
// ui stackable three column grid