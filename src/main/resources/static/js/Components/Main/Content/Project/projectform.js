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
            startdate: '',
            targetdate: '',
            name: '',
            pic: '',
            status: '',
            isLoading: false,
            done: false
        };

        this.handleSDateChange = this.handleSDateChange.bind(this);
        this.handleTDateChange = this.handleTDateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            startdate: newProps.project.startdate,
            targetdate: newProps.project.targetdate,
            name: newProps.project.name,
            pic: newProps.project.pic,
            status: newProps.project.status
        });
    }

    componentWillUnmount() {

    }

    handleSDateChange(value) {
        this.setState({startdate: value});
    }

    handleTDateChange(value) {
        this.setState({targetdate: value});
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.mode === 'edit') {
            const project = {
                "updatedBy": this.props.user.username,
                "updatedAt": new Date().toISOString(),
                "name": this.state.name,
                "pic": this.state.pic,
                "start_date": this.state.startdate,
                "target_date": this.state.targetdate,
                "status": `http://localhost:8080/api/statuses/${this.state.status}`
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
                this.props.reset();
                this.setState(
                    {startdate: '', targetdate: '',name: '', project: '', status: '', pic:'', isLoading: false, done: true}
                    );
                toastr.success("Edit Project Berhasil");
            }).fail(error => toastr.error(error.responseJSON.message));

        }
        else {
            const project = {
                "createdby": this.props.user.username,
                "createdAt": new Date().toISOString(),
                "name": this.state.name,
                "pic": this.state.pic,
                "start_date": this.state.startdate,
                "target_date": this.state.targetdate,
                "status": `http://localhost:8080/api/statuses/${this.state.status}`
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
                this.props.reset();
                this.setState({startdate: '', targetdate: '',name: '', project: '', status: '', pic:'', isLoading: false, done: true});
                toastr.success("Input Project Berhasil");
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
                            <input type="text" name="name" value={this.state.name} placeholder="Project Name" onChange={this.handleChange}/>
                        </div>
                        <div className="field">
                            <label>Start Date</label>
                            <DatePicker dateFormat="YYYY/MM/DD" onChange={this.handleSDateChange}
                                        value={this.state.startdate}/>
                        </div>
                        <div className="field">
                            <label>Target Date</label>
                            <DatePicker dateFormat="YYYY/MM/DD" onChange={this.handleTDateChange}
                                        value={this.state.targetdate}/>
                        </div>
                        <div className="field">
                            <label>PIC</label>
                            <input type="text" name="pic" value={this.state.pic} placeholder="PIC name" onChange={this.handleChange}/>
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
        );

        return this.state.done ?
            <Redirect to="/projects"/>
            : form
    }


}
