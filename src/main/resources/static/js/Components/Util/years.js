/**
 * Created by Aim MSI on 4/20/2017.
 */

import React, {Component} from 'react';

export default class Years extends Component {
    constructor(props) {
        super(props);
        this.state = {years:[], active: ''};
        this.selectYear = this.selectYear.bind(this);
    }

    selectYear(e) {
        this.setState({active: e.target.value});
    }

    componentWillMount() {
        const start = 2014;
        const end = new Date().getFullYear();
        let temp = [];
        for ( let i = start; i <= end; i++) {
            temp.push(i);
        }

        this.setState(previousState => ({
            years: this.state.years.concat(...temp)
        }));

    }

    render() {
        return (
            <select className="ui fluid dropdown" name="year" value={this.state.active}
                    onChange={this.selectYear}>
                <option value="">- Tahun -</option>
                {
                    this.state.years.map((year,index) => {
                       return <option key={index} value={year}>{year}</option>
                    })
                }
            </select>
        );


    }
}
