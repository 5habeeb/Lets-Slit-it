import React from 'react';

const Search = () => (
  <div className="dashboard-container">
    <button className="button button--search">serach</button>
    <button className="button button--add">add</button>
    <input
      className="text-input text-input--search"
      type="text"
      placeholder="Find Group"
    />
    <ul className="list-body">
      <li className="list-item">Italy trip</li>
      <li className="list-item">House</li>
      <li className="list-item">Me & Mark</li>
      <li className="list-item">Bob's brithday Party</li>
    </ul>
  </div>
);

export default Search;
