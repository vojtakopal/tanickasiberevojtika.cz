import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';

const hoveredHoc = WrappedComponent => class extends React.Component {
    state = {
        hovered: false,
    };

    handleMouseEnter = ev => {
        const { onMouseEnter } = this.props;
        this.setState({ hovered: true });
        onMouseEnter && onMouseEnter(ev);
    };

    handleMouseLeave = ev => {
        const { onMouseLeave } = this.props;
        this.setState({ hovered: false });
        onMouseLeave && onMouseLeave(ev);
    };

    render() {
        const { hovered } = this.state;
        const props = {
            ...this.props,
            hovered,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
        };
        return (
            <WrappedComponent {...props} />
        );
    }
}

export default hoveredHoc(props => <ZoomableImageWrapper {...props} />);

const ImageWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: 90% top;
    z-index: ${props => props.hovered ? 999 : 1};
`;

const ZoomableImageWrapper = posed(ImageWrapper)({
    hoverable: true,
    init: {
        scale: 1,
        boxShadow: '0px 0px 0px rgba(0,0,0,0)'
    },
    hover: {
        scale: 1.1,
        boxShadow: '0px 5px 10px rgba(0,0,0,0.2)',
        transition: { duration: 500 },
    },
});
