import React from 'react';
import moment from 'moment'; // moment is the stadard for dates, always use it
import { connect } from 'react-redux';
import DropDown from './card';

class GroupForm extends React.Component {
  state = {
    name: this.props.group ? this.props.group.name : '',
    createdAt: this.props.group ? moment(this.props.group.createdAt) : moment(),
    users: this.props.users,
    members: [this.props.creator],
    calendarFocused: false,
    error: ''
  };

  onNameChange = e => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = e => {
    e.preventDefault(); // prevent page refresh

    if (!this.state.name) {
      this.setState(() => ({
        error: 'Please add a name!'
      }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        name: this.state.name,
        createdAt: this.state.createdAt.valueOf(),
        members: this.state.members
      });
    }
  };

  addToMembers = member => {
    this.setState({
      members: [...this.state.members, member]
    });
  };

  render() {
    const users = this.props.users;
    let members = this.state.members;
    const buttonText = 'Save';
    return (
      <form className="form" onSubmit={this.onSubmit} className="left">
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          className="text-input full-size"
          type="text"
          placeholder="Group name"
          autoFocus={true}
          value={this.state.name}
          onChange={this.onNameChange}
        />

        <h2 className="members-header">Members</h2>
        {members != undefined ? (
          members.map(member => (
            <li className="list-item member-item" key={member.uid}>
              {member.displayName.split(' ')[0]}
            </li>
          ))
        ) : (
          <div>You are the only user :(</div>
        )}

        <DropDown users={users} addToMembers={this.addToMembers} />

        <div className="center">
          <button className=" button button--save center">{buttonText}</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    creator: state.users.filter(user => user.uid == state.auth.uid)[0],
    users: state.users.filter(user => user.uid != state.auth.uid)
  };
};

export default connect(
  mapStateToProps,
  undefined
)(GroupForm);
