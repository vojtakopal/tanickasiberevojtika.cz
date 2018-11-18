import { shuffle, size, map } from 'lodash/fp';
import styled from 'styled-components';
import InfiniteVirtualGrid from "./InfiniteVirtualGrid";
import Picture from "./Picture";

const originalImages = [
    require('./intro_bg.jpg'),
    require('./intro2_bg.jpg'),
    require('./intro3_bg.jpg'),
    require('./intro4_bg.jpg'),
    require('./intro5_bg.jpg'),
];

const images = map(() => shuffle(originalImages), originalImages);

const Welcome = () => (
    <WelcomeWrapper>
        T❤️V
    </WelcomeWrapper>
);
const WelcomeWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 5em;
    font-family: Helvetica;
    color: white;
`;

const mod = m => x => (((x % m) + m) % m);

const renderItem = ({ col, row }) => {
    if ((col + row) % 2 === 0) {
        const imagesCount = size(images);
        const imageRow = mod(imagesCount)(row >> 1);
        const imageCol = mod(imagesCount)(col >> 1);
        return <Picture image={images[imageRow][imageCol]} />;
    } 

    return <Welcome />;
};

export default () => <InfiniteVirtualGrid renderItem={renderItem} />;
