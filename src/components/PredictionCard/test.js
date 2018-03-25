import React from 'react';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';

import PredictionCard from './index';

configure({ adapter: new Adapter() });

const predictionMock = {
  date: '131414020',
  icon: '10n',
  info: 'Clouds'
}

test('Test PredictionCard Component - with icon', () => {
  const component = shallow(<PredictionCard {...predictionMock} />);
  expect(component.find('img').length).toEqual(1);
  expect(component.find('h5').length).toEqual(2);
});

test('Test PredictionCard Component - without icon', () => {
  const component = shallow(<PredictionCard />);
  expect(component.find('img').length).toEqual(0);
  expect(component.find('h5').length).toEqual(2);
});

test('Test PredictionCard Snapshot', () => {
  const component = renderer.create(
    <PredictionCard {...predictionMock}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})