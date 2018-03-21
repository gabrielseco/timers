import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './CountDownTimer.scss';
import LuxonDate from './../../utils/luxon-date';

class CountDownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: {
        dayOfWeek: '',
        day: '',
        month: '',
        year: ''
      }
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
      }
    });
  }

  render() {
    const { title } = this.props;
    const { dayOfWeek, day, month, year } = this.state.date;
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        {/* <div className={styles.wrapperDates}>
          <div className={styles.box}>
            <h3>1</h3>
            <span>Days</span>
          </div>
          <div className={styles.box}>
            <h3>1</h3>
            <span>Hours</span>
          </div>
          <div className={styles.box}>
            <span>1</span>
            <span>Minutes</span>
          </div>
          <div className={styles.box}>
            <span>1</span>
            <span>Seconds</span>
          </div>
        </div>
 */}
        <div className={styles.dateDescription}>
          <span>Tiempo hasta { dayOfWeek }, {day} de {month} de {year}  (Madrid time)</span>
        </div>
      </div>
    );
  }
}

CountDownTimer.propTypes = {
  date: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default CountDownTimer;
