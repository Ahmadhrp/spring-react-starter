/**
 * Created by Aim MSI on 4/18/2017.
 */

import React, {Component} from 'react'

export default class Printpdf extends Component {

    constructor(props) {
        super(props);
        this.state = {bulan: '', tahun:''};
        this.printPDF = this.printPDF.bind(this);
    }

    printPDF() {

        const report = {
            "programmer" :  this.props.user.id
        };

        $.ajax({
            url: "http://10.10.5.112:8080/pdf",
            contentType: "application/json",
            dataType: "json",
            type: 'post',
            headers: {
                "X-CSRF-TOKEN": this.props.token
            },
            data: JSON.stringify(report)
        }).then((data) => {
            console.log(data);
           // this.setState({date: '', uraian: '', project: '', status: '', isLoading: false, done: true});
           // toastr.success("Input Report Berhasil");
        }).fail(error => toastr.error(error.responseJSON.message));



        var columns = ["Tanggal", "Uraian", "Status"];
        var rows = [
            ["2017-01-01", "Mendesain User Interface", "Done"],
            ["2017-01-02", "Mendesain Database", "Done"],
            ["2017-01-03", "Coding Front End", "On Progress"],
            ["2017-01-04", "Coding Controller View", "Done"],
        ];

        var doc = new jsPDF();
        doc.autoTable(columns, rows);
        doc.output("dataurlnewwindow");
    }

    render() {
        return (
            <div>
                <h1 className="page-header">Print Report</h1>
                <div className="row placeholders">
                    <button className="btn btn-primary" onClick={this.printPDF}>Print</button>
                </div>
            </div>

        );
    }
}