import React from 'react';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import SuperiorHeader from './index';

configure({ adapter: new Adapter() });

const weatherMock = {
  country: 'Br',
  name: 'Campina Grande'
}

const predictionMock = {
  date: '131414020',
  icon: '10n',
  info: 'Clouds'
}

test('Test SuperiorHeader Component', () => {
  const component = shallow(<SuperiorHeader weather={weatherMock}/>);
  expect(component.find('.app-pickup-form').length).toEqual(1);

  expect(toJson(component)).toMatchSnapshot();
});
