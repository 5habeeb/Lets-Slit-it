import React from 'react';
import Search from './Search';
import AddGroup from './AddGroup';

class DashboardPage extends React.Component {
  state = {
    searchPageIsActive: true
  };

  viewSearch = () => {
    this.selectBtn('search-group');
    this.setState({
      searchPageIsActive: true
    });
  };

  viewAdd = () => {
    this.selectBtn('add-group');
    this.setState({
      searchPageIsActive: false
    });
  };

  removeSelectClass = () => {
    document.getElementById('search-group').classList.remove('select-btn');
    document.getElementById('add-group').classList.remove('select-btn');
  };

  selectBtn = id => {
    this.removeSelectClass();
    document.getElementById(id).classList.add('select-btn');
  };

  render() {
    return (
      <div className="content-container">
        <div className="header-menu-container">
          <button
            className="button-menu-header button-border-right select-btn button-half-size"
            onClick={this.viewSearch}
            id="search-group"
          >
            Search groups
          </button>
          <button
            className="button-menu-header button-half-size"
            onClick={this.viewAdd}
            id="add-group"
          >
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
