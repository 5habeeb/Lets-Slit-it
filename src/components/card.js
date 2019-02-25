import React, { Component } from 'react';

class DropDown extends Component {
  state = {
    showMenu: false,
    users: this.props.users
  };

  showMenu = event => {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  };

  closeMenu = event => {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
  };

  onItemClicked = userToMember => {
    this.setState({
      users: this.state.users.filter(user => user.uid != userToMember.uid)
    });
    this.props.addToMembers(userToMember);
  };

  render() {
    const users = this.state.users;
    return (
      <div>
        <button className="dropbtn" onClick={this.showMenu}>
          Add a Friend
        </button>

        {this.state.showMenu ? (
          <div
            className="dropdown-content"
            ref={element => {
              this.dropdownMenu = element;
            }}
          >
            {users.map(user => (
              <div key={user.uid} onClick={() => this.onItemClicked(user)}>
                {user.displayName}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default DropDown;
