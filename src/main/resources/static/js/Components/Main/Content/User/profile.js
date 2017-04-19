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
            url: "http://10.10.5.112:8080/api/programmers",
        }).then((data, prevState) => this.setState({
            employees: data._embedded.programmers,
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
            </div>
        );
    }
}
// ui stackable three column grid