import React from 'react';
import moment from 'moment'; // moment is the stadard for dates, always use it
import { SingleDatePicker } from 'react-dates';
import { connect } from 'react-redux';

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

  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
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

  render() {
    let members = this.state.members;
    const buttonText = this.props.group ? 'Save groups' : 'Add Group';
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          className="text-input"
          type="text"
          placeholder="Group name"
          autoFocus={true}
          value={this.state.name}
          onChange={this.onNameChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={day => false}
        />
        {console.log(this.props.creator, this.props.users)}
        <h2>Members</h2>
        {members.map(member => (
          <div key={member.uid}>{member.displayName.split(' ')[0]}</div>
        ))}

        <div>
          <button className="button">{buttonText}</button>
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
