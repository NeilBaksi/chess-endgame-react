import React from 'react';
import {DropTarget} from 'react-dnd';
import Square from './Square';
import Constants from './Constants';

const BoardSquare = React.createClass({
    propTypes: {
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired,
        isOver: React.PropTypes.bool.isRequired,
        canDrop: React.PropTypes.bool.isRequired,
        connectDropTarget: React.PropTypes.func.isRequired
    },
    renderOverlay() {
        const isOver = this.props.isOver;
        const canDrop = this.props.canDrop;
        if ( isOver ) {
            if ( canDrop ) {
                return <div className="highlight valid-move" />;
            }
            else {
                return <div className="highlight invalid-move" />;
            }
        }
        else if ( canDrop ) {
            return <div className="highlight suggest" />;
        }
        return false;
    },
    render() {
        const isBlack = ( this.props.x + this.props.y ) % 2 == 1;
        
        return this.props.connectDropTarget(
            <div className="board-square">
                <Square key={this.props.key} black={isBlack}>{this.props.children}</Square>
                {this.renderOverlay()}
            </div>
        );
    }
});

export default DropTarget(
    Constants.ItemTypes.PIECE, Constants.DropTargets.SQUARE, Constants.DropTargets.collect
)(BoardSquare);