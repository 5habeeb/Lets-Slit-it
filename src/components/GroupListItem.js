import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const GroupListItem = ({ name, createdAt, id, members }) => (
  <Link className="list-item" to={`/group/${id}`}>
    <div>
      <h3 className="list-item__title">{name}</h3>
      <span className="list-item__sub-title">
        {moment(createdAt).format('MMMM Do, YYYY')}
      </span>
    </div>
    <div>
      <p className="list-item__data-members">{members.length} members</p>
    </div>
  </Link>
);
export default GroupListItem;
