import React from 'react';
import PaymentListItem from './PaymentListItem';

class BalancePage extends React.Component {
  state = {
    paymentsArray: []
  };

  componentWillMount() {
    this.getBalances();
  }

  getBalances = () => {
    const { members, expenses } = this.props;
    const numberOfMembers = members.length;
    let totalExpenseVal = 0;
    let people = [];

    members.map(member => {
      people.push({
        ...member,
        paid: 0,
        paymentState: 0
      });
    });

    for (let i = 0; i < expenses.length; i++) {
      for (let j = 0; j < people.length; j++) {
        if (expenses[i].payerId === people[j].uid) {
          totalExpenseVal += expenses[i].amount;
          let paid = people[j].paid + expenses[i].amount;
          people[j] = {
            ...people[j],
            paid
          };
        }
      }
    }

    people = this.getPeopleWithPaymenState(
      people,
      numberOfMembers,
      totalExpenseVal
    );
    people = this.eliminatePeopleWithZeroPaymentSate(people);

    let paymentsArray = [];

    let fixedLoop = 100;
    while (people.length >= 2 && fixedLoop) {
      people = this.sortByPaymentstate(people);
      console.log(people);
      let first = people[0];
      let last = people[people.length - 1];

      let transaction;
      let fpState = first.paymentState;
      let lpState = last.paymentState;

      if (fpState >= lpState) {
        transaction = Math.abs(lpState);
        let paymentState = fpState + lpState >= 0.01 ? fpState + lpState : 0;
        first = {
          ...first,
          paymentState
        };
        last = {
          ...last,
          paymentState: 0
        };

        paymentsArray.push({
          from: last.displayName,
          to: first.displayName,
          val: transaction
        });
      } else {
        transaction = fpState;
        first = {
          ...first,
          paymentState: 0
        };

        let paymentState = lpState + fpState >= 0.01 ? lpState + fpState : 0;
        last = {
          ...last,
          paymentState
        };
        paymentsArray.push({
          from: first.displayName,
          to: last.displayName,
          val: transaction
        });
      }
      people[0] = first;
      people[people.length - 1] = last;

      fixedLoop--;
      people = this.eliminatePeopleWithZeroPaymentSate(people);
      console.log(people);
    }
    this.setState({
      paymentsArray
    });
  };

  sortByPaymentstate = people => {
    return people.sort((a, b) => {
      return b.paymentState - a.paymentState;
    });
  };

  eliminatePeopleWithZeroPaymentSate = people => {
    return people.filter(person => person.paymentState !== 0);
  };

  getPeopleWithPaymenState = (people, numberOfMembers, totalExpenseVal) => {
    const mustPaidAmount =
      Math.round((totalExpenseVal / numberOfMembers) * 1000) / 1000;
    let peopleWithPaymenState = [];
    people.map(person => {
      const paymentState =
        Math.round((person.paid - mustPaidAmount) * 1000) / 1000;
      peopleWithPaymenState.push({
        ...person,
        paymentState
      });
    });
    return peopleWithPaymenState;
  };

  render() {
    let i = 0;
    return (
      <div className="content-container">
        <div className="list-body">
          {this.state.paymentsArray.length === 0 ? (
            <div className="list-item--message">
              <span>No payments found</span>
            </div>
          ) : (
            this.state.paymentsArray.map(payment => (
              <PaymentListItem key={i++} payment={payment} />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default BalancePage;
