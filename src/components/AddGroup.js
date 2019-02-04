import React from 'react';

const AddGroup = () => (
  <div className="dashboard-container">
    <button className="button button--search">serach</button>
    <button className="button button--add">add</button>
    <input
      className="text-input text-input--search"
      type="text"
      placeholder="Group Name"
    />
    <ul className="list-body">
      <li className="list-item">
        <span className="list-item__title">Mark</span>
        <span className="list-item__sub-title">delete</span>
      </li>
      <li className="list-item">
        <span className="list-item__title">Alice</span>
        <span className="list-item__sub-title">delete</span>
      </li>
      <li className="list-item">
        <input
          className="text-input text-input--addMember"
          type="text"
          placeholder="Add member"
        />
        <span className="list-item__sub-title list-item--add-member">+</span>
      </li>
      <div className="center">
        <button className="button button--save">Save</button>
      </div>
    </ul>
  </div>
);

export default AddGroup;
