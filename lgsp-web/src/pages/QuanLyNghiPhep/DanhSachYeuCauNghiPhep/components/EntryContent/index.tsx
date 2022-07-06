import React, {Component} from 'react';
import HeaderBar from './HeaderBar';
import EditableTable from './EditableTable';

class ProjectCustomer extends Component {
  render() {
    return (
      <div>
        <HeaderBar/>
        <EditableTable/>
      </div>
    );
  }
}

export default ProjectCustomer;
