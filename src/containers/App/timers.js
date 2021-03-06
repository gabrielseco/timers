import LuxonDate from './../../utils/luxon-date';

const getMonth = date => {
  const luxon = new LuxonDate(date);
  const month = luxon.getMonth();
  return month.slice(0, 1).toUpperCase() + month.slice(1);
};

const datePayment = new Date(2018, 5, 28, 10, 0, 0);

const normalPayment = {
  title: `Nómina ${getMonth(datePayment)}`,
  date: datePayment
};

const timers = [
  {
    title: 'Red Dead Redemption 2',
    date: new Date(2018, 9, 26, 0, 0, 0)
  },
  normalPayment
];

export default timers;
