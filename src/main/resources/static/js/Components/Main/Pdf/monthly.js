/**
 * Created by Aim MSI on 4/18/2017.
 */

import React, {Component} from 'react';
import toastr from 'toastr';
import Years from '../../Util/years';
import Months from '../../Util/months';

export default class Printpdf extends Component {

    constructor(props) {
        super(props);
        this.state = {bulan: '', tahun: ''};
        this.printPDF = this.printPDF.bind(this);
    }

    printPDF() {
        console.log(this.props.user);
        const programmer = {
            "id": this.props.user.id
        };
        let rows = [];
        console.log(this.props.user.id);

        $.ajax({
            url: "http://10.10.5.112:8080/pdf",
            contentType: "application/json",
            dataType: "json",
            type: 'post',
            headers: {
                "X-CSRF-TOKEN": this.props.token
            },
            data: JSON.stringify(programmer),
        }).then((data) => {
            console.log(data);
            rows = data.map((data) => {
                return [data.tanggal, data.uraian, data.status.status]
            });
            //console.log(rows);
            const columns = ["Tanggal", "Uraian", "Status"];
            const doc = new jsPDF({orientation: "p", lineHeight: 1.5});
            doc.lineHeightProportion = 2;
            doc.setFont('Times', 'roman');
            doc.setFontSize(14);
            //.log(doc.getFontList());
            doc.text([`Nama : ${this.props.user.nama}`, `Posisi : ${this.props.user.posisi}`], 15, 20);
            doc.autoTable(columns, rows, {margin: {top: 36}});
            doc.output("dataurlnewwindow");
        }).fail(error => toastr.error(error.responseJSON.message));
    }

    render() {
        return (
            <div>
                <h1 className="page-header">Print Report</h1>
                <form className="ui form">
                    <div className="field">
                        <label>Tahun</label>
                        <Years/>
                    </div>
                    <div className="field">
                        <label>Bulan</label>
                        <Months/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.printPDF}>Print</button>
                </form>
            </div>

        );
    }
}