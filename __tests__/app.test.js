import React from 'react'
import H5 from '../src/layouts/app/app'
import Enzyme from 'enzyme'
import toJson from 'enzyme-to-json'
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new EnzymeAdapter()});


describe('render', () => {
    // test('app snapshot', () => {
    //     global.APP = require('../libs/APP')
    //     const app = Enzyme.render(<H5/>);
    //     expect(toJson(app)).toMatchSnapshot();
    // })

    test('app modal', () => {
        global.APP = require('../libs/APP')
        const app = Enzyme.shallow(<H5/>);
        app.find('.rules').simulate('click');
        expect(app.find('.rules-wrapper')).toHaveLength(1)
    })
})