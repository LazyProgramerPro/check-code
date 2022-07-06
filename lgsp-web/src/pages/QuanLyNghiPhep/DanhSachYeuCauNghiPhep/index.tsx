import React, {Component} from 'react';
import EntryHeader from './components/EntryHeader';
import EntryContent from './components/EntryContent/index';

class Files extends Component {
  render() {
    return (
      <div className="contentPage">
        <EntryHeader/>
        <EntryContent/>
      </div>
    );
  }
}

export default Files;
