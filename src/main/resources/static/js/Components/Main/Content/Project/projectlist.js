/**
 * Created by Bensolo on 4/9/2017.
 */
import React, {Component} from 'react';
import Project from './project';
import classnames from 'classnames';

export default class Projectlist extends Component {

    constructor(props) {
        super(props);
        this.state = {projects: [], isLoading: false,};
    }

    componentWillMount() {
        this.setState({condition: true});
        $.ajax({
            url: "http://localhost:8080/api/projects",
        }).then(data => {
            this.setState({projects: data._embedded.projects, condition: false});
            console.log(this.state.projects);
        });
    }

    render() {
        const csrf = this.props.token;
        const connect = this.props.transfer;
        return (
            <div>
                <h1 className="page-header">Project List</h1>
                <div className="row placeholders">
                    <div className= {classnames('ui', 'four', 'stackable', 'cards', {loading: this.state.condition})}>
                        {
                            this.state.projects.map((project, index) =>
                                <Project key={project.id} trans={connect} token={csrf}
                                         projectdetail={
                                             {
                                                 name: project.name,
                                                 pic: project.pic,
                                                 foto: project.foto,
                                                 startdate: project.start_date,
                                                 targetdate: project.target_date,
                                                 status: {
                                                     id: project.status.id,
                                                     name: project.status.status,
                                                     link: project._links.status.href
                                                 },
                                                 links: project._links.self.href
                                             }
                                         }/>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

// <div className={classnames('ui', {loading: this.state.condition})}>
//     <table className="table table-striped">
//         <thead>
//         <tr>
//             <th>No</th>
//             <th>Nama Project</th>
//             <th>PIC</th>
//             <th>Start Date</th>
//             <th>Target Date</th>
//             <th>Status</th>
//             <th>Aksi</th>
//         </tr>
//         </thead>
//         <tbody>
//         {
//             this.state.projects.map((project, index) =>
//                 <Project key={project.id} trans={connect} counter={index}
//                          projectdetail={
//                              {
//                                  name: project.name,
//                                  pic: project.pic,
//                                  foto: project.foto,
//                                  startdate: project.start_date,
//                                  targetdate: project.target_date,
//                                  status:{
//                                      id: project.status.id,
//                                      name: project.status.status,
//                                      link: project._links.status.href
//                                  },
//                                  links: project._links.self.href
//                              }
//                          }
//                          token={csrf}/>)
//         }
//         </tbody>
//     </table>
// </div>