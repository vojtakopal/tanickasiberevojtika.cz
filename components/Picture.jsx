import styled from 'styled-components';

export default ({ image }) => <ImageWrapper image={image} />;

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
`;
