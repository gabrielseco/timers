import React, { Component } from 'react';
import styles from './App.scss';

import {
  CountDownTimer,
  COUNTDOWNTIMER_TYPE_BACKWARDS
} from './../../components';
import timers from './timers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
    this.interval = undefined;
  }

  componentDidMount() {
    this.interval = setInterval(() => this.updateInterval(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateInterval() {
    this.setState({
      date: new Date()
    });
  }

  renderCounters() {
    return timers.map((timer, index) => {
      return (
        <div className={styles.containerCounter} key={index}>
          <CountDownTimer
            title={timer.title}
            date={timer.date}
            currentDate={this.state.date}
          />
        </div>
      );
    });
  }

  render() {
    /* const counters = this.renderCounters(); */
    return (
      <div className={styles.container}>
        <CountDownTimer
          title="ApaHuida Mission Completed"
          date={new Date(2018, 7, 2, 13, 10, 0)}
          currentDate={new Date(2018, 7, 2, 13, 10, 0)}
          type={COUNTDOWNTIMER_TYPE_BACKWARDS}
        />
        <h3 className={styles.phrase}>Cachopo Team is ANNIHILATED</h3>
      </div>
    );
  }
}

export default App;
