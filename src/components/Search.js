import React from 'react';
import { connect } from 'react-redux';
import GroupListItem from './GroupListItem';
import { auth } from 'firebase';

class Search extends React.Component {
  state = {
    groups: this.props.groups
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.groups !== this.props.groups) {
      this.setState({
        groups: this.props.groups
      });
    }
  }

  componentWillMount() {
    this.setState({
      groups: this.props.groups
    });
  }

  onTextChange = e => {
    let searchedVal = e.target.value;
    let filteredGroups = this.props.groups.filter(group =>
      group.name.toLowerCase().includes(searchedVal.toLowerCase())
    );
    this.setState({
      groups: filteredGroups
    });
  };

  getUsersGroups = allGroups => {
    const userGroups = [];
    allGroups.map(group => {
      let isMember = false;
      group.members.map(member => {
        if (member.uid == this.props.userId) {
          isMember = true;
        }
      });
      if (isMember) {
        userGroups.push(group);
      }
    });
    return userGroups;
  };
  render() {
    let usersGroups = [];
    usersGroups = this.getUsersGroups(this.state.groups);

    return (
      <div className="dashboard-containers">
        <input
          className="text-input text-input--search"
          type="text"
          placeholder="Search groups"
          onChange={this.onTextChange}
        />
        <div className="list-body">
          {usersGroups.length === 0 ? (
            <div className="list-item--message">
              <span>No Groups</span>
            </div>
          ) : (
            usersGroups.map(group => (
              <GroupListItem key={group.id} {...group} />
            ))
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    groups: state.groups,
    userId: state.auth.uid
  };
};

export default connect(mapStateToProps)(Search);
