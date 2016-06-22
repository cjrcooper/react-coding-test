

import React from 'react';
import Searching from 'components/loading.js';
import List from 'components/lists.js';
import _ from 'lodash';
import styles from './styles.css';

export default class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      inputText: '',
    }; // setInitialState
    this.updateSearchField = this.updateSearchField.bind(this);
  }

  componentDidMount() {
    fetch('https://lendi-api-dev.herokuapp.com/api/v1/suggested-products')
    .then((res) => {
      res.json()
      .then((response) => {
        this.setState({
          resultsData: response.data,
          loading: false,
        });
      });
    });
  }
  updateSearchField(e) {
    this.setState({
      inputText: e.target.value,
    });
  }
  render() {
    let results = null;

    const allBankNames = _.chain(this.state.resultsData).filter((data) => {
      return data.bank_name && data.bank_name.toLowerCase().startsWith(this.state.inputText.toLowerCase());
    }).map((data) => {
      return (
        <ul key={data.product_id} className={`${styles.searchContainer}`}>
          <li><h3>{data.bank_name}</h3></li>
          <li><span>Product</span> - {data.product_name}</li>
          <li><span>Interest Rate</span> - {data.interest_rate}</li>
          <li><span>Comparison Rate</span> - {data.comparison_rate}</li>
        </ul>
      );
    })
    .value();


    if (this.state.loading) {
      results = (<List component={Searching} />);
      return (
        <div className="search-container">
          <div className="SearchResults">
            {results}
          </div>
        </div>
      );
    } else {
      return (
        <div className={`${styles.searchContainer}`}>
          <div className={`${styles.searchHeaderContainer}`}>
            <h1 className={`${styles.searchHeader}`}>Filter By Bank</h1>
            <input className={`${styles.searchField}`} placeholder="Enter Bank Name" onChange={this.updateSearchField} value={this.state.inputText}></input>
          </div>
          <div className="SearchResults">
            <ul className={`${styles.resultsContainer}`}>
              {allBankNames}
            </ul>
          </div>
        </div>
      );
    }
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  url: React.PropTypes.func,
  resultsData: React.PropTypes.array,
  inputText: React.PropTypes.string,
};
