import React from 'react';
import numeral from 'numeral';

const PaymentListItem = ({ payment }) => (
  <div className="list-item list-item-payment">
    <p className="payment-title list-item__title">
      {payment.from} <span>owes</span> {payment.to}
    </p>
    <p className="payment-amount list-item__data">
      {numeral(payment.val / 100).format('0,00.00') + ' SEK'}
    </p>
  </div>
);

export default PaymentListItem;
