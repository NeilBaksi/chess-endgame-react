import React from "react";
import { mount } from "enzyme";
import Board from './Board';
import BoardSquare from './BoardSquare';
import ChessPiece from './ChessPiece';
import Square from './Square'
import Adapter from 'enzyme-adapter-react-14';
import enzyme from 'enzyme';


describe("Board", () => {
	let props;
	let mountedBoard;
	enzyme.configure({ adapter: new Adapter() });

	const board = () => {

	if (!mountedBoard) {
	  mountedBoard = mount(
	    <Board />
	  );
	}
	return mountedBoard;
	}

	beforeEach(() => {
	    props = {
	      turn: undefined,
	      pieces: undefined,
	      gameEnd: undefined,
	    };
    	mountedBoard = undefined;
  	});
  
	it("always renders a div", () => {
  		const divs = board().find(BoardSquare);
	  	expect(divs.length).toBeGreaterThan(0);

	});
		
	describe("any rendered `BoardSquare`", () => {
		it("receives 3 props", () => {
    		const divs = board().find(BoardSquare);
    		expect(Object.keys(divs.first().props()).length).toBe(3);
  		});
	});
	describe("any rendered `ChessPiece`", () => {
		it("receives 3 props", () => {
    		const divs = board().find(ChessPiece);
    		expect(Object.keys(divs.first().props()).length).toBe(3);
  		});
	});
	describe("any rendered `Square`", () => {
		it("receives 2 props", () => {
    		const divs = board().find(Square);
    		expect(Object.keys(divs.first().props()).length).toBe(2);
  		});
	});
	describe("when `gameEnd` is false", () => {
  		beforeEach(() => {
			props.gameEnd = false;
		});
		it("does not render a `Game Over`", () => {
			expect(board().find("h2").length).toBe(0);
		});
	});
});