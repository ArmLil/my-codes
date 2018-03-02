import styled from 'styled-components'
import { generator } from 'uigradients'

export default styled.div`
  ${generator({ gradient: 'cherryblossoms'})};
  border: 1px solid #41ADDD;
  padding: 2px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: inset 2px 1px 7px #000000;
  @media all and (max-width: 550px) {
    flex-wrap: wrap;
  }
`;
