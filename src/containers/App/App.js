import React, { Component } from 'react';
import styles from './App.scss';

import { CountDownTimer } from './../../components';
import timers from './timers';
import LuxonDate from './../../utils/luxon-date';
import MAGIC_STRING from './magicString';
import HOUR_VALIDATION from './validations';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMidday: false
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.updateInterval(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateInterval() {
    const newDate = new Date();
    const luxonDate = new LuxonDate(newDate);
    const hour = luxonDate.getHours();
    const minute = luxonDate.getMinutes();
    const second = luxonDate.getSeconds();

    const validation =
      hour === HOUR_VALIDATION &&
      minute >= 0 &&
      minute <= 5 &&
      second >= 0 &&
      second <= 59;

    if (validation) {
      this.setState({
        isMidday: true
      });
    } else {
      this.setState({
        isMidday: false
      });
    }
  }

  renderCounters() {
    return timers.map((timer, index) => {
      return (
        <div className={styles.containerCounter} key={index}>
          <CountDownTimer title={timer.title} date={timer.date} />
        </div>
      );
    });
  }

  render() {
    const { isMidday } = this.state;
    const counters = this.renderCounters();
    return (
      <div className={styles.container}>
        {counters}
        {isMidday ? (
          <div className={styles.magicContainer}>
            <h2>{MAGIC_STRING}</h2>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
