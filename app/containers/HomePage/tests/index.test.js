import React from 'react';
import { HomePage } from '../index';
import Searching from 'components/loading.js';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import List from 'components/lists.js';


describe('<HomePage />', () => {
  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(
      <HomePage loading />
    );
    expect(renderedComponent.contains(<List component={Searching} />)).toEqual(true);
  });


  it('should make a fetch request to the specificied url on load', () => {
    const renderedComponent = mount(
      <HomePage
        loading={false}
      />
    );
    expect(renderedComponent.props.loading).toBe(false);
  });
});
