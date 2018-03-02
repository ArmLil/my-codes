import React from 'react'
import { searchSinglePhoto } from './searchSinglePhoto'
import { loadSingle } from '../../actions'
import { connect } from 'react-redux'
import List from '../../components/List'
import LoadingIndicator from '../../components/LoadingIndicator'
import CenteredSection from '../../styling-components/CenteredSection'
import Title from '../../styling-components/Title'
import Img from '../../styling-components/Img'


  export class SinglePage extends React.Component {
    componentDidMount(){
      const { username, photo_id } = this.props.params
      this.props.onLoading(username, photo_id)
    }
    render() {
      const { singleLoading, singleError, single, farm, server, url_id } = this.props
      const img_url = `https://${farm}/${server}/${url_id}`
      if (singleLoading) {
        return <List component={LoadingIndicator} />;
      }
      if (singleError) {
        return  (
          <CenteredSection>
            {singleError}
            <p>{'...Please, try again!'}</p>
          </CenteredSection>
          )
      }
      if (single) {
        const {title, id, owner, description} = single.photo
        const url = single.photo.urls.url[0]._content
        return (
            <CenteredSection style = {{diplay:'flex', overflow:'hidden'}}>
              <Title> {title._content} </Title>
              <p> photo id - {id} </p>
              <p> photo owner - {owner.realname} </p>
              <p style={{color: 'hsla(337, 92%, 52%, 0.94)'}}> owner username - {owner.username} </p>
              <Img style={{width:'100%',height:'100%', margin:'0.5em'}} src={img_url} alt="img-Logo" />
              <p style={{padding:'1em'}}> ...{description._content} </p>
              <a href={url}> url = {url} </a>
            </CenteredSection>
        );
      }
      return <CenteredSection/>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
     single: state.single,
     singleLoading: state.singleLoading,
     singleError: state.singleError,
     farm:ownProps.params.farm,
     server:ownProps.params.server,
     url_id:ownProps.params.url_id,
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onLoading: (username, photo_id) => {
      dispatch(loadSingle())
      dispatch(searchSinglePhoto(username, photo_id))
    },
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(SinglePage);
