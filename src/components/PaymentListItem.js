import React from 'react';

const PaymentListItem = ({ payment }) => (
  <div className="list-item list-item-payment">
    <p className="payment-title list-item__title">
      {payment.from} <span>owes</span> {payment.to}
    </p>
    <p className="payment-amount list-item__data"> {payment.val} SEK</p>
  </div>
);

export default PaymentListItem;
