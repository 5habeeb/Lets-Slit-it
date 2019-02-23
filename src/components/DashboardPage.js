import React from 'react';
import Search from './Search';
import AddGroup from './AddGroup';

class DashboardPage extends React.Component {
  state = {
    searchPageIsActive: true
  };

  viewSearch = () => {
    this.setState({
      searchPageIsActive: true
    });
  };

  viewAdd = () => {
    this.setState({
      searchPageIsActive: false
    });
  };

  render() {
    return (
      <div className="content-container">
        <div>
          <button onClick={this.viewSearch}>Search groups</button>
          <button onClick={this.viewAdd}>Add group</button>
        </div>
        {this.state.searchPageIsActive ? (
          <Search />
        ) : (
          <AddGroup viewSearch={this.viewSearch} />
        )}
      </div>
    );
  }
}

export default DashboardPage;
