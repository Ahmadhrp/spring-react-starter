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
        let data = {
            tanggal: this.props.tanggal,
            uraian: this.props.uraian,
            link: this.props.links
        }
        this.props.trans(data);
        this.setState({edit: true});

    }

    hapusReport() {
        $.ajax({
            url: this.props.links,
            type: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': this.props.token,
            }
        }).then(data => {
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
                <td>{this.props.tanggal}</td>
                <td>{this.props.uraian}</td>
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
            return <Redirect to="/daily"/>;
        }
        else {
            return report;
        }


    }
}
