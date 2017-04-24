/**
 * Created by Aim MSI on 4/18/2017.
 */

import React, {Component} from 'react';
import toastr from 'toastr';
import Years from '../../Util/years';
import Months from '../../Util/months';
import classnames from 'classnames';

export default class Printpdf extends Component {

    constructor(props) {
        super(props);
        this.state = {month: '', year: '', errors: {}, isLoading:false };
        this.setYear = this.setYear.bind(this);
        this.setMonth = this.setMonth.bind(this);
        this.printPDF = this.printPDF.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
    }

    printPDF(){
        const programmer = {
            "id": this.props.user.id
        };
        let rows = [];
        console.log(this.props.user.id);
        this.setState({isLoading: true});
        $.ajax({
            url: "http://localhost:8080/pdf",
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
            this.setState({isLoading: false});
            doc.output("dataurlnewwindow");
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

    handlePrint() {

        let errors = {};
        if (this.state.month === '') errors.month = 'Pilih Bulan Bous';
        if (this.state.year === '') errors.year = 'Pilih Tahun Bous';
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0

        if (isValid) {
            console.log("print cos no error");
            //this.printPDF();
        } else {
            console.log("upsss ad error");
        }
    }

    setYear(year){
        if (!!this.state.errors.year) {
            let errors = Object.assign({}, this.state.errors);
            delete errors.year;
            this.setState({year : year, errors});
        } else {
            this.setState({year : year});
        }
    }

    setMonth(month){
        if (!!this.state.errors.month) {
            let errors = Object.assign({}, this.state.errors);
            delete errors.month;
            this.setState({month : month, errors});
        } else {
            this.setState({month : month});
        }
    }

    render() {
        return (
            <div>
                <h1 className="page-header">Print Report</h1>
                <form className={classnames('ui', 'form', {loading: this.state.isLoading})}>
                    <div className={classnames('field', {error: !!this.state.errors.year})}>
                        <label>Tahun</label>
                        <Years setYear={this.setYear}/>
                        <span>{this.state.errors.year}</span>
                    </div>
                    <div className={classnames('field', {error: !!this.state.errors.month})}>
                        <label>Bulan</label>
                        <Months setMonth={this.setMonth}/>
                        <span>{this.state.errors.month}</span>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handlePrint}>Print</button>
                </form>
            </div>

        );
    }
}