import LuxonDate from './../../utils/luxon-date';

const getMonth = date => {
  const luxon = new LuxonDate(date);
  const month = luxon.getMonth();
  return month.slice(0, 1).toUpperCase() + month.slice(1);
};

const datePayment = new Date(2018, 3, 27, 10, 0, 0);

const timers = [
  {
    title: 'Paga Extra',
    date: new Date(2018, 5, 28, 10, 0, 0)
  },
  {
    title: `Nómina ${getMonth(datePayment)}`,
    date: datePayment
  }
];

export default timers;
