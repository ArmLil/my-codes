import React from 'react'
import CenteredSection from '../../styling-components/CenteredSection'
import Container from '../../styling-components/Container'
import messages from './messages'
import FormComponent from '../../components/FormComponent'
import Title from '../../styling-components/Title'

export default class HomePage extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <Container >
          <CenteredSection >
            <Title> {messages.startProjectHeader}</Title>
            <p style={{color: 'hsla(337, 92%, 52%, 0.94)'}}>  {messages.startProjectMessage} </p>
          </CenteredSection>
          <FormComponent></FormComponent>
      </Container>
    )
  }
}
