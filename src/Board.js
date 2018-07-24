import React from 'react';
import BoardSquare from './BoardSquare';
import ChessPiece from './ChessPiece';
import {DragDropContext as DnDContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Constants from './Constants';

const Board = React.createClass({
    
    getInitialState() {
        return {
            turn: Constants.PieceColors.WHITE,
            pieces: Constants.PieceStartingPositions,
            gameEnd: false
        };
    },
    
    pieceCanMoveTo(pid, destX, destY) {
        let dx;
        let dy;
        const p = this.state.pieces[pid];
        if ( !p ) {
            return false;
        }
        if ( p.color !== this.state.turn ) {
            return false;
        }
        dx = Math.abs(p.x - destX);
        dy = Math.abs(p.y - destY);

        switch (p.pieceType) {
            case Constants.PieceTypes.KNIGHT:
                return (
                    ( dx == 1 && dy == 2 ) || ( dx == 2 && dy == 1 )
                );
                break;
            case Constants.PieceTypes.ROOK:
                return (
                    ( dx > 0 && !dy ) || ( !dx && dy > 0 )
                );
                break;
            case Constants.PieceTypes.KING:
                return (
                    (( dx==1 && dy==1 ) || ( dx==1 && dy==0 ) || ( dx==0 && dy==1 )) 
                );
                break;
            case Constants.PieceTypes.BISHOP:
                return (
                    (dx>0 && dy>0 && dx == dy )
                );
                break;
        }
        return false;
    },
    movePieceTo(pid, destX, destY) {
        if ( this.pieceCanMoveTo(pid, destX, destY) ) {
            let newTurn;
            const pieces = this.state.pieces;
            const piece = pieces[pid];
        	let target;
            target = this.getPieceBySquare(destX, destY);
            if ( this.state.turn == Constants.PieceColors.WHITE ) {
                newTurn = Constants.PieceColors.BLACK;
        		if ( target.color == newTurn) {
        			target.x = -1;
        			target.y =-1;
        			if(target.id=="bK"){
        				this.state.gameEnd= true
        				newTurn = Constants.PieceColors.WHITE
        			}
        		}
            }
            else {
                newTurn = Constants.PieceColors.WHITE;
                if ( target.color == newTurn) {
        			target.x = -1;
        			target.y =-1;
        			if(target.id=="wK"){
        				this.state.gameEnd= true
        				newTurn = Constants.PieceColors.BLACK
        			}
        		}
            }

            piece.x = destX;
            piece.y = destY;
            pieces[pid] = piece;
            
            this.setState({ pieces, turn: newTurn });
        }
    },
    getPieceBySquare(x, y) {
        var p;
        let pObj;
        const pieces = this.state.pieces;
        for ( var p in pieces ) {
            if ( pieces[p].x == x && pieces[p].y == y ) {
                pObj = pieces[p];
                pObj.id = p;
                return pObj;
            }
        }
        return false;
    },
    renderPieceInSquare(x, y) {
        const piece = this.getPieceBySquare(x, y);
        if ( piece ) {
            return ( <ChessPiece board={this} piece={piece.pieceString} id={piece.id} /> );
        }
        return false;
    },
    renderSquare(x, y) {
        return ( <BoardSquare key={ x + y * 8 } x={x} y={y}>{this.renderPieceInSquare(x, y)}</BoardSquare> );
    },
    render() {
        const squares = [];
        for ( let y = 0; y < 8; y++ ) {
            for ( let x = 0; x < 8; x++ ) {
                squares.push(this.renderSquare(x, y));
            }
        }
        const gameEnd = this.state.gameEnd
        return (
            <div>
            	{gameEnd ? (
                	<h2>Game Over! {this.state.turn} wins! </h2>
            	) : (            		
            		<h3>{this.state.turn}'s Turn</h3>
            	)}
            		
                <div className="board">
                    {squares}
                </div>
            </div>
        );
    }
});
export default DnDContext(HTML5Backend)(Board);
