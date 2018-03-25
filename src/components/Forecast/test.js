import React from 'react';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';

import { Forecast } from './index';

configure({ adapter: new Adapter() });

const forecastMock = {
  forecast: {
    list: []
  }
}

test('Test Forecast Component', () => {
  const component = shallow(<Forecast forecast={forecastMock}/>);
  expect(component.text()).toEqual('<CSSTransitionGroup />');
});

test('Test Forecast Snapshot', () => {
  const component = renderer.create(
    <Forecast forecast={forecastMock}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})