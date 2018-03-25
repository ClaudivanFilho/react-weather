import React from 'react';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';

import Loading from './index';

configure({ adapter: new Adapter() });

test('Test Loading Component - With active false', () => {
  const component = shallow(<Loading active={false}/>);
  expect(component.find('img').length).toEqual(0);
});

test('Test Loading Component - With active true', () => {
  const component = shallow(<Loading active={true}/>);
  expect(component.find('img').length).toEqual(1);
});

test('Test Loading Snapshot', () => {
  const component = renderer.create(
    <Loading active={true}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})