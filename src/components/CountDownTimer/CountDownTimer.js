import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './CountDownTimer.scss';
import LuxonDate from './../../utils/luxon-date';

class CountDownTimer extends Component {
  constructor(props) {
    super(props);
    this.countDownInitialState = {
      countdown: {
        days: '0',
        hours: '0',
        minutes: '0',
        seconds: '0'
      }
    };
    this.state = {
      date: {
        dayOfWeek: '',
        day: '',
        month: '',
        year: ''
      },
      ...this.countDownInitialState
    };
    this.luxonDate = new LuxonDate(props.date);
  }

  componentDidMount() {
    const dayOfWeek = this.luxonDate.getDayOfTheWeek();
    const day = this.luxonDate.getDay();
    const month = this.luxonDate.getMonth();
    const year = this.luxonDate.getYear();

    this.setState(prevState => {
      return {
        ...prevState,
        date: {
          dayOfWeek: dayOfWeek,
          day: day,
          month: month,
          year: year
        }
      };
    });

    this.updateInterval();

    this.interval = setInterval(() => this.updateInterval(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateInterval() {
    const date = new Date();

    const {
      days,
      hours,
      minutes,
      seconds
    } = this.luxonDate.getDaysAndTimeRemaing(date);

    if (days < 0) {
      this.setState(prevState => {
        return {
          ...prevState,
          ...this.countDownInitialState
        };
      });
    } else {
      this.setState(prevState => {
        return {
          ...prevState,
          countdown: {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
          }
        };
      });
    }
  }

  render() {
    const { title } = this.props;
    const { dayOfWeek, day, month, year } = this.state.date;
    const { days, hours, minutes, seconds } = this.state.countdown;
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.wrapperDates}>
          <div className={styles.box}>
            <h3 className={styles.boxTitle}>{days}</h3>
            <span>Días</span>
          </div>
          <div className={styles.box}>
            <h3 className={styles.boxTitle}>{hours}</h3>
            <span>Horas</span>
          </div>
          <div className={styles.box}>
            <h3 className={styles.boxTitle}>{minutes}</h3>
            <span>Minutos</span>
          </div>
          <div className={styles.box}>
            <h3 className={styles.boxTitleSeconds}>{seconds}</h3>
            <span>Segundos</span>
          </div>
        </div>
        <div className={styles.dateDescription}>
          <span>
            Tiempo hasta {dayOfWeek}, {day} de {month} de {year} (Madrid time)
          </span>
        </div>
      </div>
    );
  }
}

CountDownTimer.propTypes = {
  date: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default CountDownTimer;
