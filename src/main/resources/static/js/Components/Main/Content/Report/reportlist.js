/**
 * Created by Bensolo on 4/9/2017.
 */
import React, {Component} from 'react';
import Report from './report';

export default class Reportlist extends Component {

    constructor(props) {
        super(props);
        this.state = {reports: []};
    }

    componentDidMount() {
        $.ajax({
            url: "http://localhost:8080/api/dailyreports",
        }).then(data => this.setState({
            reports: data._embedded.dailyreports
        }));
    }

    render() {
        const csrf = this.props.token;
        const connect = this.props.transfer;
        return (
            <div>
                <h1 className="page-header">Report List</h1>
                <div>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Tanggal</th>
                            <th>Uraian</th>
                            <th>Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.reports.map((report, index) =>
                                <Report key={index} trans={connect} counter={index}
                                        report={{tanggal: report.tanggal,
                                            uraian: report.uraian,
                                            project: report.project_id,
                                            links: report._links.self.href}} token={csrf}/>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}