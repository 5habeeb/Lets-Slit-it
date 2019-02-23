import React from 'react';
import { connect } from 'react-redux';
import GroupListItem from './GroupListItem';

const Search = props => (
  <div className="dashboard-container">
    <input
      className="text-input text-input--search"
      type="text"
      placeholder="Find Group"
    />
    <div className="list-body">
      {props.groups.length === 0 ? (
        <div className="list-item--message">
          <span>No Groups</span>
        </div>
      ) : (
        props.groups.map(group => <GroupListItem key={group.id} {...group} />)
      )}
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    groups: state.groups
  };
};

export default connect(mapStateToProps)(Search);
