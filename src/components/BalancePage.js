import React from 'react';

const BalancePage = () => (
  <div className="content-container">
    <div className="dashboard-container">
      <div className="group-header">
        <button className="button button--back "> Back to Groups</button>
        <span className="group-header__subtitle">Stockholm Trip</span>
      </div>
      <button className="button button--search">Payments</button>
      <button className="button button--add">Balances</button>
      <ul className="list-body">
        <li className="list-item">
          <div className="balance-list-item-left">
            <span className="big-txt">You</span>
            <span>owe</span>
            <span className="big-txt">Ahmad</span>
          </div>
          <div className="balance-list-item-right-red">69 SEK</div>
        </li>
        <li className="list-item">
          <div className="balance-list-item-left">
            <span className="big-txt">Alice</span>
            <span>owe</span>
            <span className="big-txt">You</span>
          </div>
          <div className="balance-list-item-right-green">300 SEK</div>
        </li>

        <li className="list-item">
          <div className="balance-list-item-left">
            <span className="big-txt">Michal</span>
            <span>owe</span>
            <span className="big-txt">Ahmad</span>
          </div>
          <div className="balance-list-item-right-black">175 SEK</div>
        </li>

        <li className="list-item">
          <div className="balance-list-item-left">
            <span className="big-txt">Bob</span>
            <span>owe</span>
            <span className="big-txt">You</span>
          </div>
          <div className="balance-list-item-right-green">1126 SEK</div>
        </li>
      </ul>
    </div>
  </div>
);

export default BalancePage;
