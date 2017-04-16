/**
 * Created by Bensolo on 4/9/2017.
 */
import React, {Component} from 'react';
import Report from './report';
import classnames from 'classnames';

export default class Reportlist extends Component {

    constructor(props) {
        super(props);
        this.state = {reports: [], isLoading: false,};
    }

    componentWillMount() {
        this.setState({condition: true});
        $.ajax({
            url: "http://localhost:8080/api/reports",
        }).then(data => {
            this.setState({reports: data._embedded.reports, condition: false});
            console.log(this.state.reports);
        });
    }

    render() {
        const csrf = this.props.token;
        const connect = this.props.transfer;
        return (
            <div>
                <h1 className="page-header">Report List</h1>
                <div className={classnames('ui', {loading: this.state.condition})}>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Project</th>
                            <th>Tanggal</th>
                            <th>Uraian</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.reports.map((report, index) =>
                                <Report key={report.id} trans={connect} counter={index}
                                        reportdetail={
                                            {
                                                tanggal: report.tanggal,
                                                uraian: report.uraian,
                                                project: {
                                                    id: report.project.id,
                                                    name: report.project.name,
                                                    link: report._links.project.href
                                                },
                                                status:{
                                                    id: report.status.id,
                                                    name: report.status.status,
                                                    link: report._links.status.href
                                                },
                                                links: report._links.self.href
                                            }
                                        }
                                        token={csrf}/>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}