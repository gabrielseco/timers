import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './CountDownTimer.scss';
import LuxonDate from './../../utils/luxon-date';

export const COUNTDOWNTIMER_TYPE_BACKWARDS = 'backwards';
export const COUNTDOWNTIMER_TYPE_FORWARD = 'forward';

function getInstanceDate({ date, currentDate, type }) {
  const luxon =
    type === COUNTDOWNTIMER_TYPE_BACKWARDS
      ? new LuxonDate(date)
      : new LuxonDate(currentDate);
  return luxon;
}

function getPropDateByType({ date, currentDate, type }) {
  return type === COUNTDOWNTIMER_TYPE_BACKWARDS ? currentDate : date;
}

function getTypeDescription(type) {
  return type === COUNTDOWNTIMER_TYPE_FORWARD ? 'desde' : 'hasta';
}

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
    this.luxonDate = getInstanceDate({
      date: this.props.date,
      currentDate: this.props.currentDate,
      type: this.props.type
    });
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

    const date = getPropDateByType({
      date: this.props.date,
      currentDate: this.props.currentDate,
      type: this.props.type
    });

    this.updateDate(date);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentDate !== this.props.currentDate) {
      if (this.props.type === COUNTDOWNTIMER_TYPE_FORWARD) {
        this.luxonDate = getInstanceDate({
          date: this.props.date,
          currentDate: this.props.currentDate,
          type: this.props.type
        });
      }
      const date = getPropDateByType({
        date: this.props.date,
        currentDate: this.props.currentDate,
        type: this.props.type
      });
      this.updateDate(date);
    }
  }

  updateDate(date) {
    const {
      days,
      hours,
      minutes,
      seconds
    } = this.luxonDate.getDaysAndTimeRemaing(date);

    const isTheDateRightNow =
      days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0;

    if (isTheDateRightNow) {
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

  renderSubtitles(subtitles) {
    return subtitles.map(subtitle => {
      return <p className={styles.subtitleDescription}>{subtitle}</p>;
    });
  }

  render() {
    const { title, type } = this.props;
    const { dayOfWeek, day, month, year } = this.state.date;
    const { days, hours, minutes, seconds } = this.state.countdown;
    const typeOfDescription = getTypeDescription(type);
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
            Tiempo {typeOfDescription} {dayOfWeek}, {day} de {month} de {year}{' '}
            (Madrid time)
          </span>
        </div>
        {this.props.subtitleDescription
          ? this.renderSubtitles(this.props.subtitleDescription)
          : null}
      </div>
    );
  }
}

CountDownTimer.defaultProps = {
  type: COUNTDOWNTIMER_TYPE_BACKWARDS
};

CountDownTimer.propTypes = {
  currentDate: PropTypes.object,
  date: PropTypes.object.isRequired,
  subtitleDescription: PropTypes.any,
  title: PropTypes.string.isRequired,
  type: PropTypes.string
};

export default CountDownTimer;
