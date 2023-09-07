import styled from "styled-components";
import {useState} from "react";
const Image = styled.img`
      max-width: 100%;
      max-height: 100%;
    `;
const BigImage = styled.img`
      max-width: 100%;
      max-height: 200px;
`;
const ImageButtons = styled.div`
      display: flex;
      gap: 10px;
      flex-grow: 0;
      margin-top: 10px;
    `;

const ImageButton = styled.div`
      border:1px solid #ccc;
      ${props => props.active ? `
        border-color: #ccc;
      ` : `
        border-color: transparent;
        opacity: .6;
      `}
      height: 70px;
      padding: 5px;
      cursor: pointer;
      border-radius: 5px;
    `;
const BigImageWrapper = styled.div`
      text-align: center;
`;
export default function ProductImages({images}) {
    const [activeImage,setActiveImage] = useState(images?.[0]);
    return(
        <>
            <BigImageWrapper>
                <BigImage src={activeImage} />
            </BigImageWrapper>
            <ImageButtons>
                {images.map(image => (
                    // eslint-disable-next-line react/jsx-key
                    <ImageButton key={image} active={image===activeImage} onClick={() => setActiveImage(image)}>
                        <Image src={image} alt=""/>
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    );
}