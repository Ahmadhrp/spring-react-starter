/**
 * Created by Bensolo on 4/9/2017.
 */
import React, {Component} from 'react';
import Programmer from './programmer';

export default class Dashboard extends Component {

    render() {
        return (
            <div>
                <h1 className="page-header">Selamat Datang, <span>{this.props.user.username}</span></h1>
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