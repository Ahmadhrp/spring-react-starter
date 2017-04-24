/**
 * Created by Bensolo on 4/9/2017.
 */
import React, {Component} from 'react';

export default class Programmer extends Component {
    render() {
        return (

                <div className="ui raised card">
                    <div className="image">
                        <img src="http://localhost:8080/image/steve.jpg"/>
                    </div>
                    <div className="content">
                        <a className="header">{this.props.name}</a>
                        <div className="meta">
                            <span className="date">Joined in {this.props.age}</span>
                        </div>
                    </div>
                    <div className="extra content">
                        <div className="ui two buttons">
                            <div className="ui basic green button">Bio</div>
                            <div className="ui basic red button">Chat</div>
                        </div>
                    </div>
                </div>

        );
    }
}