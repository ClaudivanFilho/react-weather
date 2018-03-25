import React from 'react';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';

import CardImage from './index';

configure({ adapter: new Adapter() });

test('Test CardImage Component - without text description', () => {
  const component = shallow(<CardImage />);
  expect(component.text()).toEqual('');
});

test('Test CardImage Component - with text description', () => {
  const component = shallow(<CardImage>Teste</CardImage>);
  expect(component.text()).toEqual('Teste');
});

test('Test CardImage Snapshot', () => {
  const component = renderer.create(
    <CardImage width={50} title="Wind" color="blue">
      1 m/sec
    </CardImage>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})