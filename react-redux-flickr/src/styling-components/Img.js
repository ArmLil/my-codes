import styled from 'styled-components'

const Img = styled.img`
  width: 10em;
  height: 7em;
  margin: 0 auto;
  padding:0.3em;
  &:hover {
      -moz-box-shadow: 0 0 10px #41ADDD;
      -webkit-box-shadow: 0 0 10px #41ADDD;
       box-shadow: 0px 0px 10px #41ADDD;
   }
  `;

export default Img;
