import React from 'react';
import { shallow } from 'enzyme';
import { CountDownTimer } from './CountDownTimer';

describe('CountDownTimer suite', () => {
  it('renders CountDownTimer without any state injected', () => {
    const component = shallow(<CountDownTimer />);
    expect(component).toBeDefined();
  });
});
