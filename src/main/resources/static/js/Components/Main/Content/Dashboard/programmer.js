/**
 * Created by Bensolo on 4/9/2017.
 */
import React, {Component} from 'react';

export default class Programmer extends Component {
    render() {
        return (
            <div className="col-xs-12 col-sm-4 placeholder">
                <img
                    src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                    width="200" height="200" className="img-responsive"
                    alt="Generic placeholder thumbnail"/>
                <h4>{this.props.name}</h4>
                <span className="text-muted">{this.props.age}'s Old </span>
            </div>
        );
    }
}