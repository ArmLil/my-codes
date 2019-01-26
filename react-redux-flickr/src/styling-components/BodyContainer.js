import styled from 'styled-components'

const BodyContainer = styled.div`
  display:flex;
	height: 40em;
	@media screen and (max-width: 600px){
		flex-wrap: wrap;
	}
`;

export default BodyContainer;
