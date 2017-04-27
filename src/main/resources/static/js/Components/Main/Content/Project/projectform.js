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
            errors: {},
            foto: '',
            filename: '',
            filesize: 0,
            done: false
        };

        this.handleSDateChange = this.handleSDateChange.bind(this);
        this.handleTDateChange = this.handleTDateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.chooseFile = this.chooseFile.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
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
        this.props.reset('project');
    }

    chooseFile() {
        $('#attachmentName').trigger('click');
    }

    handleImageChange(e) {
        let errors = {}
        let reader = new FileReader();
        let file = e.target.files[0];
        if (!!this.state.errors.foto) {
            errors = Object.assign(errors, this.state.errors);
            reader.onloadstart = () => {
                if (file.size >= 3145728) {
                    errors.foto = 'File Tidak Boleh Lebih Dari 3 Mega Bous';
                    reader.abort();
                } else if (!file.type.match('image.*')) {
                    errors.foto = 'File Yang Didukung Hanya Image Bous';
                    reader.abort();
                }
                else {
                    delete errors.foto;
                }

            };
            reader.onloadend = () => {
                this.setState({
                    foto: file,
                    filesize: file.size,
                    imagePreviewUrl: reader.result,
                    filename: file.name,
                    errors
                });
            };
        } else {
            errors = Object.assign(errors, this.state.errors);
            reader.onloadstart = () => {
                if (file.size >= 3145728) {
                    errors.foto = 'File Tidak Boleh Lebih Dari 3 Mega Bous';
                    reader.abort();
                } else if (!file.type.match('image.*')) {
                    errors.foto = 'File Yang Didukung Hanya Image Bous';
                    reader.abort();
                } else {
                    delete errors.foto;
                }
            };
            reader.onloadend = () => {
                this.setState({
                    foto: file,
                    filesize: file.size,
                    imagePreviewUrl: reader.result,
                    filename: file.name,
                    errors
                });
            };
        }
        reader.readAsDataURL(file)
    }

    handleSDateChange(value) {
        if (!!this.state.errors.start_date) {
            let errors = Object.assign({}, this.state.errors);
            delete errors.start_date;
            // this.setState({[e.target.name]: e.target.value , errors});
            this.setState({startdate: value, errors});
        } else {
            this.setState({startdate: value});
        }
    }

    handleTDateChange(value) {
        if (!!this.state.errors.target_date) {
            let errors = Object.assign({}, this.state.errors);
            delete errors.target_date;
            // this.setState({[e.target.name]: e.target.value , errors});
            this.setState({targetdate: value, errors});
        } else {
            this.setState({targetdate: value});
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

    submitForm() {
        let formData = new FormData();
        console.log("URI = " + this.props.project.link);
        if (this.props.mode === 'edit') {
            const project = {
                "updatedBy": this.props.user.username,
                "updatedAt": new Date().toISOString(),
                "name": this.state.name,
                "pic": this.state.pic,
                "start_date": this.state.startdate,
                "target_date": this.state.targetdate,
                "status": this.state.status ? `http://localhost:8080/api/statuses/${this.state.status}` : ''
            };
            formData.append("file", this.state.foto);
            formData.append('project', new Blob([JSON.stringify(project)], {
                type: "application/json"
            }));
            this.setState({isLoading: true});
            $.ajax({
                url: this.props.project.link,
                contentType: false,
                enctype: 'multipart/form-data',
                processData: false,
                type: 'PATCH',
                headers: {
                    "Content-Type": undefined,
                    "X-CSRF-TOKEN": this.props.token
                },
                data: formData
            }).then(() => {
                this.props.reset();
                this.setState(
                    {
                        startdate: '',
                        targetdate: '',
                        name: '',
                        project: '',
                        status: '',
                        pic: '',
                        isLoading: false,
                        done: true
                    }
                );
                toastr.success("Edit Project Berhasil");
            }).fail(jqXHR => {
                let datas = jqXHR.responseJSON;
                let errors = {};
                datas.map(data => {
                    errors[data.property] = data.message;
                });
                this.setState({errors, isLoading: false});
                //toastr.error(error.responseJSON.message)
            });
        }
        else {
            const project = {
                "createdby": this.props.user.username,
                "createdAt": new Date().toISOString(),
                "name": this.state.name,
                "pic": this.state.pic,
                "start_date": this.state.startdate,
                "target_date": this.state.targetdate,
                "status": this.state.status ? `http://localhost:8080/api/statuses/${this.state.status}` : ''
            };
            formData.append("file", this.state.foto);
            formData.append('project', new Blob([JSON.stringify(project)], {
                type: "application/json"
            }));
            this.setState({isLoading: true});
            $.ajax({
                url: "http://localhost:8080/api/projects",
                contentType: false,
                enctype: 'multipart/form-data',
                processData: false,
                type: 'post',
                headers: {
                    "Content-Type": undefined,
                    "X-CSRF-TOKEN": this.props.token
                },
                data: formData
            }).then(() => {
                this.props.reset();
                this.setState({
                    startdate: '',
                    targetdate: '',
                    name: '',
                    project: '',
                    status: '',
                    pic: '',
                    foto: '',
                    isLoading: false,
                    done: true
                });
                toastr.success("Input Project Berhasil");
            }).fail((jqXHR) => {
                    let datas = jqXHR.responseJSON;
                    let errors = {};
                    datas.map(data => {
                        errors[data.field] = data.message;
                    });
                    this.setState({errors, isLoading: false});
                    //toastr.error(error.responseJSON.message);
                }
            );

        }
    }

    handleSubmit(e) {
        e.preventDefault();
        //console.log(this.state.filesize);
        // let errors = {};
        // if (this.state.name === '') errors.name = 'Masukkan Nama Projectnya Bous';
        // if (this.state.pic === '') errors.pic = 'Masukkan Nama PICnya Bous';
        // if (this.state.status === '') errors.status = 'Pilih Status Project Bous';
        // if (this.state.foto !== ''){
        //     console.log('ada foto');
        //     if (!this.state.foto.type.match('image.*')) errors.foto = 'File Yang Didukung Hanya Image Bous';
        //     else if (this.state.filesize >= 3145728) errors.foto = 'File Tidak Boleh Lebih Dari 3 Mega Bous';
        // }
        // if (this.state.startdate === '' || this.state.startdate === null) errors.start_date = 'Pilih Tanggal Startnya Bous';
        // if (this.state.targetdate === '' || this.state.targetdate === null) errors.target_date = 'Pilih Tanggal Targetnya Bous';
        // this.setState({errors});
        // const isValid = Object.keys(errors).length === 0
        //
        // if (isValid) {
        //     console.log("submit cos no error");
        //     //this.submitForm();
        // } else {
        //     console.log("upsss ad error");
        // }
        this.submitForm();
    }

    render() {
        const form = (
            <div>
                <h1 className="page-header">New Project</h1>
                <div id="input_project">
                    <form className={classnames('ui', 'form', {loading: this.state.isLoading})}
                          encType="multipart/form-data"
                          onSubmit={this.handleSubmit}>
                        <div className={classnames('field', {error: !!this.state.errors.name})}>
                            <label>Project</label>
                            <input type="text" name="name" value={this.state.name === undefined ? '' : this.state.name}
                                   placeholder="Project Name" onChange={this.handleChange}/>
                            <span>{this.state.errors.name}</span>
                        </div>
                        <div className={classnames('field', {error: !!this.state.errors.foto})}>
                            <label>Project's Thumbnail</label>
                            <div className="ui action input">
                                <input type="text" value={this.state.filename} placeholder="Choose File..."/>
                                <button className="ui button" type="button" onClick={this.chooseFile}>Upload</button>
                                <input type="file" id="attachmentName" name="attachmentName"
                                       onChange={this.handleImageChange}
                                       style={{"display": "none"}}/>
                            </div>
                            <span>{this.state.errors.foto}</span>
                        </div>
                        <div className={classnames('field', {error: !!this.state.errors.start_date})}>
                            <label>Start Date</label>
                            <DatePicker dateFormat="YYYY/MM/DD" onChange={this.handleSDateChange}
                                        value={this.state.startdate}/>
                            <span>{this.state.errors.start_date}</span>
                        </div>
                        <div className={classnames('field', {error: !!this.state.errors.target_date})}>
                            <label>Target Date</label>
                            <DatePicker dateFormat="YYYY/MM/DD" onChange={this.handleTDateChange}
                                        value={this.state.targetdate}/>
                            <span>{this.state.errors.target_date}</span>
                        </div>
                        <div className={classnames('field', {error: !!this.state.errors.pic})}>
                            <label>PIC</label>
                            <input type="text" name="pic" value={this.state.pic === undefined ? '' : this.state.pic}
                                   placeholder="PIC name" onChange={this.handleChange}/>
                            <span>{this.state.errors.pic}</span>
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
        );

        return this.state.done ?
            <Redirect to="/projects"/>
            : form
    }


}
// <div className={classnames('field', {error: !!this.state.errors.foto})}>
//     <label>Project's Thumbnail</label>
//     <input type="text" id="_attachmentName"/>
//     <label htmlFor="attachmentName" className="ui icon button btn-file">
//         <i className="attachment basic icon"></i>
//         <input type="file" id="attachmentName" name="attachmentName" onChange={this.handleImageChange}
//                style={{"display": "none"}}/>
//     </label>
// </div>


// <div className={classnames('field', {error: !!this.state.errors.foto})}>
//     <label>Project's Thumbnail</label>
//     <input className="fileInput"
//            type="file"
//            onChange={this.handleImageChange}/>
//     <span>{this.state.errors.foto}</span>
// </div>