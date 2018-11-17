import styled from 'styled-components';
import IntroImage from './intro_bg.jpg';

export default () => (
    <ImageWrapper background={IntroImage}>
    </ImageWrapper>
);

const Image = styled.img`
    position: absolute;
    width: 100%;
`;

const ImageWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-image: url(${props => props.background});
    background-size: cover;
    background-position: 90% top;
`;
