/**
 * Created by Aim MSI on 4/11/2017.
 */

import React,{Component} from 'react';

export default class Report extends Component
{

    editReport(){

    }

    hapusReport()
    {
        $.ajax({
            url: this.props._links,
            type: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': this.props.token
            },
            success: function (data) {
                this.setState({display: false});
            },
            error: function (xhr, ajaxOptions, thrownError) {
                toastr.error(xhr.responseJSON.message);
            }
        });
    }

    render(){
        return(
            <tr>
                <td>{this.props.key}</td>
                <td>{this.props.tanggal}</td>
                <td>{this.props.uraian}</td>
                <td>
                    <a href="#" onClick={this.editReport.bind(this)} className="btn btn-warning btn-xs" data-toggle="tooltip" data-placement="left" title="Edit"><i className="glyphicon glyphicon-pencil"></i></a>
                    <a href="#" onClick={this.hapusReport.bind(this)} className="btn btn-danger btn-xs" data-toggle="tooltip" data-placement="right" title="Hapus"><i className="glyphicon glyphicon-remove"></i></a>
                </td>
            </tr>
        );
    }
}