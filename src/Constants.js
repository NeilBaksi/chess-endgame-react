var Constants = {};

Constants.ItemTypes = {
    PIECE: 'chesspiece'
};

Constants.PieceColors = {
    WHITE: 'White',
    BLACK: 'Black'
};

Constants.PieceTypes = {
    KNIGHT: 'knight',
    ROOK: 'rook',
    BISHOP: 'bishop',
    KING: 'king'
};

Constants.PieceStrings = {
    BLACK_ROOK: '♜',
    BLACK_KNIGHT: '♞',
    BLACK_BISHOP: '♝',
    BLACK_KING: '♚',
    WHITE_ROOK: '♖',
    WHITE_KNIGHT: '♘',
    WHITE_BISHOP: '♗',
    WHITE_KING: '♔'
};

Constants.DragSources = {
    collect: function (connect, monitor) {
        return {
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging()
        }
    },
    PIECE: {
        beginDrag: function (props, connect, monitor) {
            return { 
                id: props.id,
                board: props.board
            };
        }
    }
};

Constants.DropTargets = {
    collect: function (connect, monitor) {
        return {
            connectDropTarget: connect.dropTarget(),
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }
    },
    SQUARE: {
        canDrop: function(props, monitor) {
            var item = monitor.getItem();
            return item.board.pieceCanMoveTo(item.id, props.x, props.y);
        },
        drop: function (props, monitor) {
            var item = monitor.getItem();
            item.board.movePieceTo(item.id, props.x, props.y);
        }
    }
};

Constants.PieceStartingPositions = {
    // White backline pieces
    
    'wN1': {
        x: 3, y: 5,
        color: Constants.PieceColors.WHITE,
        pieceType: Constants.PieceTypes.KNIGHT,
        pieceString: Constants.PieceStrings.WHITE_KNIGHT
    },
    'wB1': {
        x: 2, y: 2,
        color: Constants.PieceColors.WHITE,
        pieceType: Constants.PieceTypes.BISHOP,
        pieceString: Constants.PieceStrings.WHITE_BISHOP
    },
    'wK': {
        x: 7, y: 4,
        color: Constants.PieceColors.WHITE,
        pieceType: Constants.PieceTypes.KING,
        pieceString: Constants.PieceStrings.WHITE_KING
    },
    'wN2': {
        x: 5, y: 4,
        color: Constants.PieceColors.WHITE,
        pieceType: Constants.PieceTypes.KNIGHT,
        pieceString: Constants.PieceStrings.WHITE_KNIGHT
    },
    
    // Black backline pieces
    'bR1': {
        x: 3, y: 0,
        color: Constants.PieceColors.BLACK,
        pieceType: Constants.PieceTypes.ROOK,
        pieceString: Constants.PieceStrings.BLACK_ROOK
    },
    'bK': {
        x: 5, y: 2,
        color: Constants.PieceColors.BLACK,
        pieceType: Constants.PieceTypes.KING,
        pieceString: Constants.PieceStrings.BLACK_KING
    }
};

module.exports = Constants;