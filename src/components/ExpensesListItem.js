import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

class ExpensesListItem extends React.Component {
  render() {
    const {
      description,
      amount,
      createdAt,
      id,
      payerId,
      members,
      groupId
    } = this.props;
    const payersArray = members.filter(member => member.uid == payerId);
    const payerName =
      payersArray != undefined ? payersArray[0].displayName : 'unknown';

    return (
      <Link className="list-item" to={`/edit/${groupId}/${id}`}>
        <div>
          <h3 className="list-item__title">{description}</h3>
          <span className="list-item__sub-title">
            {moment(createdAt).format('MMMM Do, YYYY')}
          </span>
        </div>
        <div>
          <h4 className="list-item__data">
            {numeral(amount / 100).format('0,00.00') + ' SEK'}
          </h4>
          <span className="list-item__rb">{`paid by ${payerName}`}</span>
        </div>
      </Link>
    );
  }
}

export default ExpensesListItem;
