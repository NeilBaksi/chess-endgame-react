import React from 'react';

const Square = React.createClass({
    propTypes: {
        black: React.PropTypes.bool
    },

    render() {
        const fill = this.props.black ? '#CC9965' : '#FFCC98';
        const style = {
            backgroundColor: fill,
        };

        return <div className="square" style={style}>{this.props.children}</div>;
    }
});

export default Square;