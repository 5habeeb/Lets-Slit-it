import React from 'react';
import { connect } from 'react-redux';
import GroupListItem from './GroupListItem';

class Search extends React.Component {
  state = {
    groups: this.props.groups
  };

  onTextChange = e => {
    let searchedVal = e.target.value;
    let filteredGroups = this.props.groups.filter(group =>
      group.name.includes(searchedVal)
    );
    this.setState({
      groups: filteredGroups
    });
  };

  render() {
    let groups = this.state.groups;
    return (
      <div className="dashboard-container">
        <input
          className="text-input text-input--search"
          type="text"
          placeholder="Search groups"
          onChange={this.onTextChange}
        />
        <div className="list-body">
          {groups.length === 0 ? (
            <div className="list-item--message">
              <span>No Groups</span>
            </div>
          ) : (
            groups.map(group => <GroupListItem key={group.id} {...group} />)
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    groups: state.groups
  };
};

export default connect(mapStateToProps)(Search);
