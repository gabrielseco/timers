import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { CountDownTimer } from './../../components';

describe('App suite', () => {
  const component = shallow(<App />);
  it('renders App without any state injected', () => {
    expect(component).toBeDefined();
  });

  it('should render 2 CountDownTimer', () => {
    expect(component.find(CountDownTimer).length).toBe(2);
  });
});
