/**
 * Created by Bensolo on 4/9/2017.
 */
import React, {Component} from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import {Redirect} from 'react-router-dom';
import toastr from 'toastr';

export default class Reportform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.mode ? this.props.mode : '',
            date: this.props.report ? this.props.report.tanggal : new Date().toISOString(),
            uraian: this.props.report ? this.props.report.uraian : '',
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
            date: newProps.report.tanggal,
            uraian: newProps.report.uraian
        });
    }

    componentWillUnmount(){
        // this.setState({uraian:''});
    }

    handleDateChange(value) {
        this.setState({date: value});
    }

    handleChange(e) {
        this.setState({uraian: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.mode === 'edit') {
            const report = {
                "user_id": this.props.user.id,
                "tanggal": this.state.date,
                "uraian": this.state.uraian,
                "updatedBy": this.props.user.username,
                "updatedAt": this.state.date
            };
            this.setState({isLoading: true});
            $.ajax({
                url: this.props.report.link,
                contentType: "application/json",
                dataType: "json",
                type: 'PUT',
                headers: {
                    "X-CSRF-TOKEN": this.props.token
                },
                data: JSON.stringify(report)
            }).then(data => {
                this.setState({date: '', uraian: '', isLoading: false, done: true});
                toastr.success("Edit Report Berhasil");
            }).fail(error => toastr.error(error.responseJSON.message));

        }
        else {
            const report = {
                "user_id": this.props.user.id,
                "tanggal": this.state.date,
                "uraian": this.state.uraian,
                "createdby": this.props.user.username,
                "createdAt": this.state.date
            };
            this.setState({isLoading: true});
            $.ajax({
                url: "http://localhost:8080/api/dailyreports",
                contentType: "application/json",
                dataType: "json",
                type: 'post',
                headers: {
                    "X-CSRF-TOKEN": this.props.token
                },
                data: JSON.stringify(report)
            }).then(data => {
                this.setState({date: '', uraian: '', isLoading: false, done: true});
                toastr.success("Input Report Berhasil");
            }).fail(error => toastr.error(error.responseJSON.message));

        }

    }

    render() {
        const form = (
            <div>
                <h1 className="page-header">Input Daily Report</h1>
                <div id="input_report">
                    <form className="form-inline" name="formreport" id="formreport" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label style={{"marginRight": "10px"}} htmlFor="tanggal">Tanggal : </label>
                            <DatePicker dateFormat="YYYY/MM/DD" onChange={this.handleDateChange}
                                        value={this.state.date}/>
                        </div>
                        <div className="form-group" style={{"marginLeft": "30px"}}>
                            <label htmlFor="uraian">Uraian : </label>
                            <input className="form-control" style={{"marginLeft": "10px"}} name="uraian"
                                   type="text" onChange={this.handleChange} value={this.state.uraian}
                                   title="uraian"/>
                        </div>
                        <button className="btn btn-primary" style={{"marginLeft": "30px"}}>Save</button>
                    </form>
                </div>
            </div>
        )

        return this.state.done ? <Redirect to="/list"/> : form
    }


}