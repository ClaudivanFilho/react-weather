import React from 'react';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';

import GoogleMaps from './index';

configure({ adapter: new Adapter() });

test('Test GoogleMaps Component', () => {
  const component = shallow(<GoogleMaps />);
  expect(component.text()).toEqual('<withScriptjs(withGoogleMap(Component)) />');
});

test('Test GoogleMaps Snapshot', () => {
  const component = renderer.create(
    <GoogleMaps />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})