import React, { Component, Fragment } from 'react';
import { hot } from 'react-hot-loader';
/* import styles from './App.scss';
 */

import { CountDownTimer } from './../../components';
import timers from './timers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <CountDownTimer title={timers[0].title} date={timers[0].date}/>
      </Fragment>
    );
  }
}
export default hot(module)(App);
