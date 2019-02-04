import React from 'react';

const AddPaymentPage = () => (
  <div className="content-container">
    <div className="dashboard-container">
      <div className="group-header">
        <button className="button button--back "> Back to Groups</button>
        <span className="group-header__subtitle">Stockholm Trip</span>
      </div>
      <div className="add-payment">
        <input
          className="text-input input-payment-title"
          type="text"
          placeholder="Payment Title"
        />

        <input
          className="text-input input-payment-title"
          type="text"
          placeholder=" 00,00 SEK"
        />

        <div className="input-group__item">
          <span>Payer:</span>
          <select className="select">
            <option value="date">You</option>
            <option value="amount">Alice</option>
            <option value="amount">Bob</option>
            <option value="amount">Mark</option>
          </select>
        </div>

        <div className="center">
          <button className="button button--save">Save</button>
        </div>
      </div>
    </div>
  </div>
);

export default AddPaymentPage;
