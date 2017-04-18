/**
 * Created by Aim MSI on 4/18/2017.
 */

import React, {Component} from 'react'

export default class Printpdf extends Component {

    constructor(props) {
        super(props);
        this.printPDF = this.printPDF.bind(this);
    }

    printPDF() {

        pdfMake.fonts = {
            fontawesome: {
                normal: 'fontawesome-webfont.ttf',
                bold: 'fontawesome-webfont.ttf',
                 italics: 'fontawesome-webfont.ttf',
                 bolditalics: 'fontawesome-webfont.ttf'
            }
        };

        let docDefinition = {
            content: [
                {
                    text: 'Nama :  Ibrahim Ahmad Harahap',
                    style: 'nama'
                },
                {
                    text: `Posisi :  Programmer`,
                    style: 'posisi'
                },
                {
                    text: 't ',
                    style: 'check'
                },
                '\n\n',
                {
                    text: 'Subheader 1 - using subheader style',
                    style: 'subheader'
                },
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.\n\n',
                {
                    text: 'It is possible to apply multiple styles, by passing an array. This paragraph uses two styles: quote and small. When multiple styles are provided, they are evaluated in the specified order which is important in case they define the same properties',
                    style: ['quote', 'small']
                }
            ],
            defaultStyle: {
                font: 'fontawesome'
            },
            styles: {
                nama: {
                    fontSize: 14,
                    bold: true
                },
                posisi: {
                    marginTop:5,
                    fontSize: 14,
                    bold: true
                },
                subheader: {
                    fontSize: 12,
                    bold: true
                },
                quote: {
                    italics: true
                },
                small: {
                    fontSize: 8
                }
            }
        }

        pdfMake.createPdf(docDefinition).open();
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