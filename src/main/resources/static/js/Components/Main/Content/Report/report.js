/**
 * Created by Aim MSI on 4/11/2017.
 */

import React, {Component} from 'react';
import toastr from 'toastr';
import {Redirect} from 'react-router-dom';

export default class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {display: true, edit: false};
        this.editReport = this.editReport.bind(this);
        this.hapusReport = this.hapusReport.bind(this);
    }

    editReport() {
        console.log("id di report = "+this.props.reportdetail.project.id);
        let data = {
            tanggal: this.props.reportdetail.tanggal,
            project: this.props.reportdetail.project.id,
            status: this.props.reportdetail.status.id,
            uraian: this.props.reportdetail.uraian,
            link: this.props.reportdetail.links
        };
        this.props.trans(data);
        this.setState({edit: true});

    }

    hapusReport() {
        console.log(this.props.reportdetail.links);
        $.ajax({
            url: this.props.reportdetail.links,
            type: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': this.props.token,
            }
        }).then(() => {
            this.setState({display: false});
            toastr.success("Hapus Data Berhasil");
        }).fail(error => toastr.error(error.responseJSON.message));
    }


    render() {
        const style = {
            edit: {
                marginRight: '10px'
            }
        };
        const report = (
            <tr>
                <td>{this.props.counter + 1}</td>
                <td>{this.props.reportdetail.project.name}</td>
                <td>{this.props.reportdetail.tanggal}</td>
                <td>{this.props.reportdetail.uraian}</td>
                <td>{this.props.reportdetail.status.name}</td>
                <td>
                    <a href="#" style={style.edit} onClick={this.editReport}
                       className="btn btn-warning btn-xs" data-toggle="tooltip" data-placement="left"
                       title="Edit"><i className="glyphicon glyphicon-pencil"></i></a>
                    <a href="#" style={style.hapus} onClick={this.hapusReport}
                       className="btn btn-danger btn-xs" data-toggle="tooltip" data-placement="right" title="Hapus">
                        <i className="glyphicon glyphicon-remove"></i></a>
                </td>
            </tr>
        );
        if (this.state.display === false) {
            return null;
        }
        else if (this.state.edit) {
            return <Redirect to="/report"/>;
        }
        else {
            return report;
        }


    }
}
