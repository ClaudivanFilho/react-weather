import React from 'react';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import SuperiorHeader from './index';

configure({ adapter: new Adapter() });

test('Test SuperiorHeader Component', () => {
  const component = shallow(<SuperiorHeader />);
  expect(component.find('Link').length).toEqual(2);
  expect(component.find('div').length).toEqual(3);
  expect(toJson(component)).toMatchSnapshot();
});