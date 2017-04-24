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
            tanggal: '',
            uraian: '',
            project: '',
            listproject: [],
            status: '',
            isLoading: false,
            errors: {},
            done: false
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            tanggal: newProps.report.tanggal,
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
        if (!!this.state.errors.tanggal) {
            let errors = Object.assign({}, this.state.errors);
            delete errors.tanggal;
            this.setState({tanggal: value, errors});
        } else {
            this.setState({tanggal: value});
        }
    }

    handleChange(e) {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({[e.target.name]: e.target.value, errors});
        } else {
            this.setState({[e.target.name]: e.target.value});
        }
    }

    submitForm(){
        if (this.props.mode === 'edit') {
            const report = {
                "tanggal": this.state.tanggal,
                "project": this.state.project ? `http://localhost:8080/api/projects/${this.state.project}` : '',
                "uraian": this.state.uraian,
                "status": this.state.status ? `http://localhost:8080/api/statuses/${this.state.status}` : '',
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
                this.setState({tanggal: '', uraian: '', project: '', status: '', isLoading: false, done: true});
                toastr.success("Edit Report Berhasil");
            }).fail(jqXHR => {
                let datas = jqXHR.responseJSON.errors;
                let errors = {};
                datas.map(data => {
                    errors[data.property] = data.message;
                });
                this.setState({errors, isLoading: false});
                //toastr.error(error.responseJSON.message)
            });
        }
        else {
            const report = {
                "programmer": `http://localhost:8080/api/programmers/${this.props.user.id}`,
                "tanggal": this.state.tanggal,
                "project": this.state.project ? `http://localhost:8080/api/projects/${this.state.project}` : '',
                "uraian": this.state.uraian,
                "status": this.state.status ? `http://localhost:8080/api/statuses/${this.state.status}` : '',
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
                this.setState({tanggal: '', uraian: '', project: '', status: '', isLoading: false, done: true});
                toastr.success("Input Report Berhasil");
            }).fail(jqXHR => {
                let datas = jqXHR.responseJSON.errors;
                let errors = {};
                datas.map(data => {
                    errors[data.property] = data.message;
                });
                this.setState({errors, isLoading: false});
                //toastr.error(error.responseJSON.message)
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let errors = {};
        if (this.state.uraian === '') errors.uraian = 'Apa Isi Laporanmu Bous';
        if (this.state.project === '') errors.project = 'Pilih Projectnya Bous';
        if (this.state.status === '') errors.status = 'Pilih Status Project Bous';
        if (this.state.tanggal === '' || this.state.tanggal === null) errors.tanggal = 'Pilih Tanggalnya Bous';
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0

        if (isValid) {
            console.log("submit cos no error");
            this.submitForm();
        } else {
            console.log("upsss ad error");
        }
    }

    render() {

        const form = (
            <div>
                <h1 className="page-header">Input Daily Report</h1>
                <div id="input_report">
                    <form className={classnames('ui', 'form', {loading: this.state.isLoading})}
                          onSubmit={this.handleSubmit}>
                        <div className={classnames('field', {error: !!this.state.errors.project})}>
                            <label>Project</label>
                            <select className="ui fluid dropdown" name="project" value={this.state.project}
                                    onChange={this.handleChange}>
                                <option defaultValue value="">- Project -</option>
                                {
                                    this.state.listproject.map((project) =>
                                        <option key={project.id} value={project.id}>{project.name}</option>)
                                }
                            </select>
                            <span>{this.state.errors.project}</span>
                        </div>
                        <div className={classnames('field', {error: !!this.state.errors.tanggal})}>
                            <label>Tanggal</label>
                            <DatePicker dateFormat="YYYY/MM/DD" onChange={this.handleDateChange}
                                        value={this.state.tanggal}/>
                            <span>{this.state.errors.tanggal}</span>
                        </div>
                        <div className={classnames('field', {error: !!this.state.errors.uraian})}>
                            <label>Uraian</label>
                            <input type="text" name="uraian" value={this.state.uraian === undefined ? '' : this.state.uraian} placeholder="Uraian"
                                   onChange={this.handleChange}/>
                            <span>{this.state.errors.uraian}</span>
                        </div>
                        <div className={classnames('field', {error: !!this.state.errors.status})}>
                            <label>Status</label>
                            <select className="ui fluid dropdown" name="status" value={this.state.status}
                                    onChange={this.handleChange}>
                                <option defaultValue value="">- Pilih Status -</option>
                                {
                                    this.props.status.map((status) =>
                                        <option key={status.id} value={status.id}>{status.status}</option>)
                                }
                            </select>
                            <span>{this.state.errors.status}</span>
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