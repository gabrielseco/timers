import React, { Component } from 'react';
import styles from './App.scss';

import { CountDownTimer } from './../../components';
import timers from './timers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const counters = timers.map((timer, index) => {
      return (
        <div className={styles.containerCounter} key={index}>
          <CountDownTimer title={timer.title} date={timer.date} />
        </div>
      );
    });
    return <div className={styles.container}>{counters}</div>;
  }
}

export default App;
