/**
 * Created by Bensolo on 4/9/2017.
 */
import React, {Component} from 'react';
import DatePicker from 'react-bootstrap-date-picker';

export default class Reportform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toISOString(),
            uraian: '',
            isLoading: false
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDateChange(value) {
        this.setState({date: value});
    }

    handleChange(e) {
        this.setState({uraian: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const report = {
            "user_id": 1,
            "tanggal": this.state.date,
            "uraian": this.state.uraian,
            "createdby": 'ben',
            "createdAt": this.state.date
        };
        console.log(report);
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
        }).then(data => this.setState({date: '', uraian: '', isLoading: false}));

    }

    render() {
        return (
            <div>
                <h1 className="page-header">Input Daily Report</h1>
                <div id="input_report">
                    <form className="form-inline" name="formreport" id="formreport" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="tanggal">Tanggal : </label>
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
                        {/*<input type="hidden" name="_csrf" value={this.props.token}/>*/}
                    </form>
                </div>
            </div>
        );
    }

}