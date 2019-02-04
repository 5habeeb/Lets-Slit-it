import React from 'react';
import Search from './Search';
import AddGroup from './AddGroup';

class DashboardPage extends React.Component {
  state = {
    searchPageIsActive: false
  };

  render() {
    return (
      <div className="content-container">
        {this.state.searchPageIsActive ? <Search /> : <AddGroup />}
      </div>
    );
  }
}

export default DashboardPage;
