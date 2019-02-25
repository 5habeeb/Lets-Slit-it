import React from 'react';
import { connect } from 'react-redux';
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from '../actions/filters';
import { DateRangePicker } from 'react-dates';

export class ExpensesListFilters extends React.Component {
  onTextChange = e => {
    this.props.setTextFilter(e.target.value);
  };

  render() {
    return (
      <div className="content-container">
        <div className="">
          <div className="">
            <input
              className="text-input full-size"
              placeholder="search expenses"
              type="text"
              defaultValue={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

const mapDispatchToProps = dispatch => ({
  setTextFilter: text => dispatch(setTextFilter(text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpensesListFilters);
