import React from 'react';
import Constants from './Constants';
import {DragSource} from 'react-dnd';

const ChessPiece = React.createClass({
    propTypes: {
        connectDragSource: React.PropTypes.func.isRequired,
        isDragging: React.PropTypes.bool.isRequired,
        piece: React.PropTypes.string.isRequired
    },
    
    getDefaultProps() {
        return {
            piece: Constants.PieceStrings.WHITE_PAWN
        };
    },
    render() {
        return this.props.connectDragSource(
            <span className="piece">{this.props.piece}</span>
        );
    }
});

export default DragSource(
    Constants.ItemTypes.PIECE, Constants.DragSources.PIECE, Constants.DragSources.collect
)(ChessPiece);