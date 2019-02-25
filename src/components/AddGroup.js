import React from 'react';
import GroupForm from './GroupForm';
import { connect } from 'react-redux';
import { startAddGroup } from '../actions/groups';

class AddGroupPage extends React.Component {
  onSubmit = group => {
    this.props.startAddGroup(group);
    this.props.viewSearch();
  };

  render() {
    return (
      <div className="dashboard-container">
        <div>
          <GroupForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddGroup: group => dispatch(startAddGroup(group))
});

export default connect(
  undefined,
  mapDispatchToProps
)(AddGroupPage);
