import React from 'react';
import { shallow } from 'enzyme';
import CountDownTimer from './CountDownTimer';

describe('CountDownTimer suite', () => {
  const newDate = new Date(2018, 5, 28, 0, 0, 0);
  const currentDate = new Date(2018, 4, 28, 10, 0, 0);
  const title = 'Paga Extra';
  const component = shallow(
    <CountDownTimer title={title} date={newDate} currentDate={currentDate} />
  );

  it('renders CountDownTimer without any state injected', () => {
    expect(component).toBeDefined();
  });
});
