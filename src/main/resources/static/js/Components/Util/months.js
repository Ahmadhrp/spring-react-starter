/**
 * Created by Aim MSI on 4/20/2017.
 */

import React, {Component} from 'react';

export default class Months extends Component {
    constructor(props) {
        super(props);
        this.state = {
            months: [
                {
                    value: 1, name: 'Januari'
                },
                {
                    value: 2, name: 'Februari'
                },
                {
                    value: 3, name: 'Maret'
                },
                {
                    value: 4, name: 'April'
                },
                {
                    value: 5, name: 'Mei'
                },
                {
                    value: 6, name: 'Juni'
                },
                {
                    value: 7, name: 'Juli'
                },
                {
                    value: 8, name: 'Agustus'
                },
                {
                    value: 9, name: 'September'
                },
                {
                    value: 10, name: 'Oktober'
                },
                {
                    value: 11, name: 'November'
                },
                {
                    value: 12, name: 'Desember'
                }
            ],
            active: ''
        };
        this.selectMonth = this.selectMonth.bind(this);
    }

    selectMonth(e) {
        this.setState({active: e.target.value});
    }

    render() {
        return (

            <select className="ui fluid dropdown" name="month" value={this.state.active}
                    onChange={this.selectMonth}>
                <option value="">- Bulan -</option>
                {
                    this.state.months.map(month => {
                        return <option key={month.value} value={month.value}>{month.name}</option>
                    })
                }
            </select>
        );
    }
}
