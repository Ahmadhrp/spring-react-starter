
import React, {Component} from 'react';

export default class Dashboard extends Component {

    render() {
        return (
            <div>
                <h1 className="page-header">Selamat Datang, <span>{this.props.user.nama}</span></h1>
                <div className="row placeholders">
                    <div>
                        Development Mode
                    </div>
                </div>
            </div>
        );
    }
}
// ui stackable three column grid