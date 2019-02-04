import React from 'react';

const PaymentsPage = () => (
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
          <div className="payements-list-items--left">
            <span className="payements-list-items--left-up">
              Parking Stadshuset
            </span>
            <div className="payements-list-items--left-bottom">13.01.2019</div>
          </div>
          <div className="payements-list-items--right">
            <div className="payements-list-items--right-up">105 SEK</div>
            <div className="payements-list-items--right-bottom">
              paid by you
            </div>
          </div>
        </li>
        <li className="list-item">
          <div className="payements-list-items--left">
            <span className="payements-list-items--left-up">
              Restaurant lunch
            </span>
            <div className="payements-list-items--left-bottom">13.01.2019</div>
          </div>
          <div className="payements-list-items--right">
            <div className="payements-list-items--right-up">1540 SEK</div>
            <div className="payements-list-items--right-bottom">
              paid by Michal
            </div>
          </div>
        </li>
        <li className="list-item">
          <div className="payements-list-items--left">
            <span className="payements-list-items--left-up">Abba museum</span>
            <div className="payements-list-items--left-bottom">12.01.2019</div>
          </div>
          <div className="payements-list-items--right">
            <div className="payements-list-items--right-up">620 SEK</div>
            <div className="payements-list-items--right-bottom">
              paid by Alice
            </div>
          </div>
        </li>

        <button className="button button--add-expense">Add expense</button>
      </ul>
    </div>
  </div>
);

export default PaymentsPage;
