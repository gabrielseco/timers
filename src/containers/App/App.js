import React, { Component } from 'react';
import styles from './App.scss';

import {
  CountDownTimer,
  COUNTDOWNTIMER_TYPE_FORWARD
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
        <div className={styles.containerCounter}>
          <CountDownTimer
            title={timers[0].title}
            date={timers[0].date}
            currentDate={this.state.date}
          />
        </div>
        <div className={styles.containerCounter}>
          <CountDownTimer
            title="ApaHuida"
            date={new Date(2018, 5, 7, 10, 20, 0)}
            currentDate={this.state.date}
            type={COUNTDOWNTIMER_TYPE_FORWARD}
            subtitleDescription={[
              'Cachopo Team 3 / 7',
              'Overall Apa Team 5 / 10'
            ]}
          />
        </div>
      </div>
    );
  }
}

export default App;
