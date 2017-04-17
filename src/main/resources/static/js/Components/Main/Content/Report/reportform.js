/**
 * Created by Bensolo on 4/9/2017.
 */
import React, {Component} from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import {Redirect} from 'react-router-dom';
import toastr from 'toastr';
import classnames from 'classnames';

export default class Reportform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // mode: this.props.mode ? this.props.mode : '',
            // this.props.report ? this.props.report.tanggal :
            date: '',
            uraian: '',
            project: '',
            listproject: [],
            status: '',
            isLoading: false,
            done: false
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            date: newProps.report.tanggal,
            project: newProps.report.project,
            uraian: newProps.report.uraian,
            status: newProps.report.status
        });
    }

    componentDidMount() {
        $.ajax({url: "http://localhost:8080/api/projects"}).then(data => {
            this.setState({listproject: data._embedded.projects});
            // console.log(this.state.listproject);
        })
    }

    componentWillUnmount(){
        this.props.reset('report');
    }

    handleDateChange(value) {
        this.setState({date: value});
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.mode === 'edit') {
            const report = {
                "tanggal": this.state.date,
                "project": `http://localhost:8080/api/projects/${this.state.project}`,
                "uraian": this.state.uraian,
                "status": `http://localhost:8080/api/statuses/${this.state.status}`,
                "updatedBy": this.props.user.username,
                "updatedAt": new Date().toISOString()
            };
            this.setState({isLoading: true});
            $.ajax({
                url: this.props.report.link,
                contentType: "application/json",
                dataType: "json",
                type: 'PATCH',
                headers: {
                    "X-CSRF-TOKEN": this.props.token
                },
                data: JSON.stringify(report)
            }).then(() => {
                this.setState({date: '', uraian: '', project: '', status: '', isLoading: false, done: true});
                toastr.success("Edit Report Berhasil");
            }).fail(error => toastr.error(error.responseJSON.message));

        }
        else {
            const report = {
                "programmer": `http://localhost:8080/api/programmers/${this.props.user.id}`,
                "tanggal": this.state.date,
                "project": `http://localhost:8080/api/projects/${this.state.project}`,
                "uraian": this.state.uraian,
                "status": `http://localhost:8080/api/statuses/${this.state.status}`,
                "createdby": this.props.user.username,
                "createdAt": new Date().toISOString()
            };
            this.setState({isLoading: true});
            $.ajax({
                url: "http://localhost:8080/api/reports",
                contentType: "application/json",
                dataType: "json",
                type: 'post',
                headers: {
                    "X-CSRF-TOKEN": this.props.token
                },
                data: JSON.stringify(report)
            }).then(() => {
                //this.props.reset();
                this.setState({date: '', uraian: '', project: '', status: '', isLoading: false, done: true});
                toastr.success("Input Report Berhasil");
            }).fail(error => toastr.error(error.responseJSON.message));

        }

    }

    render() {

        const form = (
            <div>
                <h1 className="page-header">Input Daily Report</h1>
                <div id="input_report">
                    <form className={classnames('ui', 'form', {loading: this.state.isLoading})}
                          onSubmit={this.handleSubmit}>
                        <div className="field">
                            <label>Project</label>
                            <select className="ui fluid dropdown" name="project" value={this.state.project}
                                    onChange={this.handleChange}>
                                <option defaultValue value="">- Project -</option>
                                {
                                    this.state.listproject.map((project) =>
                                        <option key={project.id} value={project.id}>{project.name}</option>)
                                }
                            </select>
                        </div>
                        <div className="field">
                            <label>Tanggal</label>
                            <DatePicker dateFormat="YYYY/MM/DD" onChange={this.handleDateChange}
                                        value={this.state.date}/>
                        </div>
                        <div className="field">
                            <label>Uraian</label>
                            <input type="text" name="uraian" value={this.state.uraian === undefined ? '' : this.state.uraian} placeholder="Uraian"
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="field">
                            <label>Status</label>
                            <select className="ui fluid dropdown" name="status" value={this.state.status}
                                    onChange={this.handleChange}>
                                <option defaultValue value="">- Pilih Status -</option>
                                {
                                    this.props.status.map((status) =>
                                        <option key={status.id} value={status.id}>{status.status}</option>)
                                }
                            </select>
                        </div>
                        <button className="ui button" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )

        return this.state.done ?
            <Redirect to="/reports"/>
            : form
    }


}

// <option value="1">Pnl</option>
// <option value="2">Payroll</option>
//     <option value="3">Smkn</option>


// {
//     this.state.listproject.map((project) =>
//         <option key={project.id} value={project.id}>{project.name}</option>)
// }