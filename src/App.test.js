import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import React from 'react';
import App from './App';

import { validateMovement, validateMovements, validateInstructions } from './GridReducer';
import { config } from './configs/config.js';
import { initial_state } from './configs/store.js';

configure({ adapter: new Adapter() });

describe('Test React App', () => {

    it("Renders without crashing", () => {
        shallow(<App />);
    });

    it("Renders all buttons", () => {
         const wrapper = shallow(<App />);
         expect(wrapper.find(".button").length).toEqual(3);
    });

    it("Renders a start button", () => {
         const wrapper = shallow(<App />);
         expect(wrapper.find("#start").length).toEqual(1);
    });

    it("Renders a pause button", () => {
         const wrapper = shallow(<App />);
         expect(wrapper.find("#pause").length).toEqual(1);
    });

    it("Renders a reset button", () => {
         const wrapper = shallow(<App />);
         expect(wrapper.find("#reset").length).toEqual(1);
    });

    it("Renders the correct number of rovers", () => {
         const wrapper = mount(<App />);
         expect(wrapper.find(".rover-container").length).toEqual(initial_state.rovers.length);
    });
});

// Test coordinate validation.
describe('Validate grid movement', () => {

    it('Is a valid movement coordinate', done => {
        expect(validateMovement([0, 0], [1, 1])).toBe(true);
        done();
    });

    it('Is an invalid movement coordinate', () => {
        expect(() => validateMovement(config.grid_size, [1, 1])
      ).toThrow(config.errors.out_of_bounds);
    });
});

// Test instruction validation.
describe('Validate instructions', () => {

    it('Is a valid instruction set', done => {
        expect(validateInstructions('LLRMMR')).toBe(true);
        done();
    });

    it('Is an invalid instruction set', () => {
        expect(() => validateInstructions('AZ')
      ).toThrow(config.errors.invalid_instructions);
    });

    it('Rover movements will remain within bounds of grid', done => {
        initial_state.rovers.forEach((r) => {
            expect(validateMovements(r)).toBe(true)
        });
        done();
    });

    it('Rover movements will exceed bounds of grid', () => {

        let rover_state = {
            name: "Spirit",
            position: [0, 0],
            heading: "S",
            movements: "M"
        }

        expect(() => validateMovements(rover_state)
      ).toThrow(config.errors.out_of_bounds);
    });
});