import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { decay } from 'popmotion';
import { range, map, debounce } from 'lodash/fp';

const INTERVAL = 3000;
const WIDTH = 320;
const HEIGHT = 240;

class InfiniteVirtualGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        dx: 0,
        dy: 0,
        windowWidth: 0,
        windowHeight: 0,
        counter: 0,
    };

    static defaultProps = {
        cellWidth: 320,
        cellHeight: 320,
        renderItem: () => <div></div>,
    };

    handleResize = () => {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
        });
    };  

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();

        this.interval = setInterval(() => {
            this.setState({
                dx: this.state.dx + (0.5 - Math.random()) * 320,
                dy: this.state.dy + (0.5 - Math.random()) * 240,
                pose: this.state.pose === 'on' ? 'off' : 'on',
            });
        }, INTERVAL);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        clearInterval(this.interval);
    }

    handleDragEnd = () => { 
        this.timer = setTimeout(this.startAnimation, INTERVAL)
    };

    handleDragStart = () => {
        clearInterval(this.interval);
        clearTimeout(this.timer);
    };

    handleValueChanged = {
        x: debounce(300, x => this.setState({ dx: x })),
        y: debounce(300, y => this.setState({ dy: y })),
    }

    handleMouseUp = () => this.setState({
        counter: this.state.counter + 1,
    });

    startAnimation = () => {  
        this.interval = setInterval(() => {
            this.setState({
                dx: this.state.dx + (0.5 - Math.random()) * WIDTH,
                dy: this.state.dy + (0.5 - Math.random()) * HEIGHT,
                pose: this.state.pose === 'on' ? 'off' : 'on',
            });
        }, INTERVAL);
    };

    render() { 
        const { renderItem } = this.props;
        const { dx, dy, pose, counter, windowWidth, windowHeight } = this.state;

        return (
            <Container height={windowHeight}>
                <Draggable onValueChange={this.handleValueChanged} pose={pose} dx={dx} dy={dy} onDragEnd={this.handleDragEnd} onDragStart={this.handleDragStart} onMouseUp={this.handleMouseUp}>
                    <VirtualizedGrid counter={counter} dx={dx} dy={dy} itemWidth={WIDTH} itemHeight={HEIGHT} width={windowWidth} height={windowHeight}>
                        {(rowStart, rowEnd, colStart, colEnd) => (
                            <LazyLoadedGrid rowStart={rowStart} rowEnd={rowEnd} colStart={colStart} colEnd={colEnd}>
                                {(row, col) => (
                                    <Item key={`${row}-${col}`} col={col} row={row} width={WIDTH} height={HEIGHT}>
                                        {renderItem({ col, row, width: WIDTH, height: HEIGHT })}
                                    </Item>
                                )}
                            </LazyLoadedGrid>
                        )}
                    </VirtualizedGrid>
                </Draggable>
            </Container>
        );
    }
}

const VirtualizedGrid = ({ children, dx, dy, itemWidth, itemHeight, width, height }) => (
    <React.Fragment>
        {children(
            Math.floor(-(dy+height) / itemHeight),
            Math.ceil((height * 2 - dy) / itemHeight),
            Math.floor(-(dx+width) / itemWidth),
            Math.ceil((width * 2 - dx) / itemWidth),
        )}
    </React.Fragment>
)

const LazyLoadedGrid = ({ children, rowStart, rowEnd, colStart, colEnd }) => (
    <React.Fragment>
        {map(
            row => map(
                col => children(row, col),
            )(range(colStart - 1, colEnd + 2)),
        )(range(rowStart -  1, rowEnd + 2))}
    </React.Fragment>
);

const Item = styled.div`
    position: absolute;
    width: ${props => props.width}px;
    left: ${props => props.col * props.width}px;
    height: ${props => props.height}px;
    top: ${props => props.row * props.height}px;
`;

const Draggable = posed.div({
    draggable: true,
    dragEnd: { transition: props => decay({ ...props, power: 0.1 }) },
    on: {
        x: props => props.dx,
        y: props => props.dy,
        transition: { duration: INTERVAL*2 },
    },
    off: {
        x: props => props.dx,
        y: props => props.dy,
        transition: { duration: INTERVAL*2 },
    },
});

const Container = styled.div`
    background: #333;
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    height: ${props => props.height}px;
`;

export default InfiniteVirtualGrid;
