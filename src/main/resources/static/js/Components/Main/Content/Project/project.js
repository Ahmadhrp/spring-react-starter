/**
 * Created by Aim MSI on 4/11/2017.
 */

import React, {Component} from 'react';
import toastr from 'toastr';
import {Redirect} from 'react-router-dom';

export default class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {display: true, edit: false};
        this.editProject = this.editProject.bind(this);
        this.hapusProject = this.hapusProject.bind(this);
    }

    editProject() {
        let data = {
            name: this.props.projectdetail.name,
            pic: this.props.projectdetail.pic,
            foto: this.props.projectdetail.foto,
            startdate: this.props.projectdetail.startdate,
            targetdate: this.props.projectdetail.targetdate,
            status: this.props.projectdetail.status.id,
            link: this.props.projectdetail.links
        };

        this.props.trans(data);
        this.setState({edit: true});

    }

    hapusProject() {
        console.log(this.props.projectdetail.links);
        $.ajax({
            url: this.props.projectdetail.links,
            type: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': this.props.token,
            }
        }).then(() => {
            this.setState({display: false});
            toastr.success("Hapus Project Berhasil");
        }).fail(error => toastr.error(error.responseJSON.message));
    }

    render() {

        let project;
        if(this.props.projectdetail.status.id === 2 ){
            project = (
                <div className="ui raised card">
                    <div className="image" style={{"height":"251.53px"}}>
                        <img style={{"height":"251.53px"}} src={"http://localhost:8080/public/upload/"+this.props.projectdetail.foto}/>
                    </div>
                    <div className="content">
                        <a className="header">{this.props.projectdetail.name}</a>
                        <div className="meta">
                            <span className="date">Deadline at {this.props.projectdetail.targetdate}</span>
                        </div>
                    </div>
                    <div className="extra content">
                        <div className="ui two buttons">
                            <a href="#" onClick={this.editProject}
                               className="ui basic yellow button">Edit</a>
                            <a href="#" onClick={this.hapusProject}
                               className="ui basic red button">Hapus</a>
                        </div>
                    </div>
                </div>
            );
        }else{
            project = (
                <div className="ui raised card">
                    <div className="image" style={{"height":"251.53px"}}>
                        <img style={{"height":"251.53px"}} src={"http://localhost:8080/public/upload/"+this.props.projectdetail.foto}/>
                    </div>
                    <div className="content">
                        <a className="header">{this.props.projectdetail.name}</a>
                        <div className="meta">
                            <span className="date">{this.props.projectdetail.status.name}</span>
                        </div>
                    </div>
                    <div className="extra content">
                        <div className="ui two buttons">
                            <a href="#" onClick={this.editProject}
                               className="ui basic yellow button">Edit</a>
                            <a href="#" onClick={this.hapusProject}
                               className="ui basic red button">Hapus</a>
                        </div>
                    </div>
                </div>
            );
        }

        if (this.state.display === false) {
            return null;
        }
        else if (this.state.edit) {
            return <Redirect to="/project"/>;
        }
        else {
            return project;
        }


    }
}

// <div className="ui basic yellow button" onClick={this.editProject}>Edit</div>
// <div className="ui basic red button" onClick={this.hapusProject}>Delete</div>

// <tr>
// <td>{this.props.counter + 1}</td>
// <td>{this.props.projectdetail.name}</td>
// <td>{this.props.projectdetail.pic}</td>
// <td>{this.props.projectdetail.startdate}</td>
// <td>{this.props.projectdetail.targetdate}</td>
// <td>{this.props.projectdetail.status.name}</td>
// <td>
//     <a href="#" style={style.edit} onClick={this.editProject}
//        className="btn btn-warning btn-xs" data-toggle="tooltip" data-placement="left"
//        title="Edit"><i className="glyphicon glyphicon-pencil"></i></a>
//     <a href="#" style={style.hapus} onClick={this.hapusProject}
//     className="btn btn-danger btn-xs" data-toggle="tooltip" data-placement="right" title="Hapus">
//     <i className="glyphicon glyphicon-remove"></i></a>
//     </td>
//     </tr>