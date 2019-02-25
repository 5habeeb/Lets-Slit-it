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
        <div className="header-menu-container">
          <button
            className="button-menu-header button-border-right "
            onClick={this.viewSearch}
          >
            Search groups
          </button>
          <button className="button-menu-header" onClick={this.viewAdd}>
            Add group
          </button>
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
