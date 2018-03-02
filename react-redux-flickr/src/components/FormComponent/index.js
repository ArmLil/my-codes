import React from 'react'
import Form from '../../styling-components/Form'
import Input from '../../styling-components/Input'
import P from '../../styling-components/P'
import HeaderLink from '../../styling-components/HeaderLink'
import messages from './messages'

export default class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path :'',
      username : '',
      term: '',
      limit:'',
    };
  }

 onChangeApi_key (evt) {
   this.setState({username: evt.target.value})
 }
 onChangeTerm (evt) {
   this.setState({term: evt.target.value})
 }
 onChangeLimit (evt) {
   this.setState({limit: evt.target.value})
 }
 onSubmitClick () {
   const {username, term, limit} = this.state
   if(!term || !term || !limit) {
     alert("Please, fill in all fields!!")
   }
   else {
     this.setState({path: `/${username}/${term}/${limit}`})
   }
 }
  render() {
    const path = this.state.path
    return (
      <Form>
        <p>{messages.trymeMessage}</p>
        <p style={{fontSize:'10px'}}>{messages.trymeAtPrefix}</p>
        <P>api_key</P>
         <Input
           id="username"
           placeholder="api_key"
           onChange={this.onChangeApi_key.bind(this)}
         />
         <P>key word</P>
           <Input
             id="term"
             placeholder="term"
             onChange={this.onChangeTerm.bind(this)}
           />
         <P>number of photos</P>
           <Input
             id="limit"
             placeholder="limit"
             onChange={this.onChangeLimit.bind(this)}
           />
         <div>
           <HeaderLink
             onClick={this.onSubmitClick.bind(this)}
             style={{borderRadius:'10%'}}
             to={path}>
             <P>SUBMIT</P>
           </HeaderLink>
        </div>
      </Form>
    );
  }
}
