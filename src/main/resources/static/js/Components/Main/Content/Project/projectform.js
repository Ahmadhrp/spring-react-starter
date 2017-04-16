/**
 * Created by Bensolo on 4/9/2017.
 */
import React, {Component} from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import {Redirect} from 'react-router-dom';
import toastr from 'toastr';
import classnames from 'classnames';

export default class Projectform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.mode ? this.props.mode : '',
            startdate: this.props.project ? this.props.project.startdate : new Date().toISOString(),
            targetdate: this.props.project ? this.props.project.targetdate : new Date().toISOString(),
            name: '',
            pic: '',
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
            mode: newProps.mode,
            startdate: newProps.project.startdate,
            targetdate: newProps.project.targetdate,
            name: newProps.project.name,
            pic: newProps.project.pic,
            status: newProps.project.status
        });
    }

    componentWillUnmount() {
        // this.setState({uraian:''});
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
            const project = {
                "name": this.state.name,
                "pic": this.state.pic,
                "start_date": this.state.startdate,
                "target_date": this.state.targetdate,
                "id_status": this.state.status,
                "updatedBy": this.props.user.username,
                "updatedAt": new Date().toISOString()
            };
            this.setState({isLoading: true});
            $.ajax({
                url: this.props.project.link,
                contentType: "application/json",
                dataType: "json",
                type: 'PATCH',
                headers: {
                    "X-CSRF-TOKEN": this.props.token
                },
                data: JSON.stringify(project)
            }).then(() => {
                this.setState(
                    {startdate: '', targetdate: '',name: '', project: '', status: '', pic:'', isLoading: false, mode:'', done: true}
                    );
                toastr.success("Edit Report Berhasil");
            }).fail(error => toastr.error(error.responseJSON.message));

        }
        else {
            const project = {
                "name": this.state.name,
                "pic": this.state.pic,
                "start_date": this.state.startdate,
                "target_date": this.state.targetdate,
                "id_status": this.state.status,
                "createdby": this.props.user.username,
                "createdAt": new Date().toISOString()
            };
            this.setState({isLoading: true});
            $.ajax({
                url: "http://localhost:8080/api/projects",
                contentType: "application/json",
                dataType: "json",
                type: 'post',
                headers: {
                    "X-CSRF-TOKEN": this.props.token
                },
                data: JSON.stringify(project)
            }).then(() => {
                this.setState({startdate: '', targetdate: '',name: '', project: '', status: '', pic:'',  mode:'', isLoading: false, done: true});
                toastr.success("Input Report Berhasil");
            }).fail(error => toastr.error(error.responseJSON.message));

        }

    }

    render() {
        const form = (
            <div>
                <h1 className="page-header">New Project</h1>
                <div id="input_project">
                    <form className={classnames('ui', 'form', {loading: this.state.isLoading})}
                          onSubmit={this.handleSubmit}>
                        <div className="field">
                            <label>Project</label>
                            <input type="text" name="project" placeholder="Project Name" onChange={this.handleChange}/>
                        </div>
                        <div className="field">
                            <label>Start Date</label>
                            <DatePicker dateFormat="YYYY/MM/DD" onChange={this.handleDateChange}
                                        value={this.state.startdate}/>
                        </div>
                        <div className="field">
                            <label>Target Date</label>
                            <DatePicker dateFormat="YYYY/MM/DD" onChange={this.handleDateChange}
                                        value={this.state.targetdate}/>
                        </div>
                        <div className="field">
                            <label>PIC</label>
                            <input type="text" name="pic" placeholder="PIC name" onChange={this.handleChange}/>
                        </div>
                        <div className="field">
                            <label>Status</label>
                            <select className="ui fluid dropdown" name="status" value={this.state.value}
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
        );

        return this.state.done ?
            <Redirect to="/projects"/>
            : form
    }


}
