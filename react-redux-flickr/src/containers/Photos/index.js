import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import List from '../../components/List'
import LoadingIndicator from '../../components/LoadingIndicator'
import Grid from '../../styling-components/Grid'
import CenteredSection from '../../styling-components/CenteredSection'
import { fetchPhotos } from './searchPhotos'
import { loadPhotos } from '../../actions'
import Item from '../../components/Item'
import HomePage from '../../containers/HomePage'


export class Photos extends React.Component {

  componentWillReceiveProps(newProps) {
    const {username,term,limit} = this.props;
    const update = (limit !== newProps.limit)
                || (term !== newProps.term)
                || (username !== newProps.username);
    if(update) {
      this.props.onPhotoPageLoad(newProps.username,newProps.term,newProps.limit)
    }
    else return;
  }
  componentDidMount(){
    const {username,term,limit} = this.props
    this.props.onPhotoPageLoad(username,term,limit)
  }
  singleRoute(photo){
    const url = photo.url_z.split('//')[1]
    const url_arr = url.split('/')
    return {
      farm: url_arr[0],
      server: url_arr[1],
      url_id: url_arr[2],
    }
  }

  render() {
    const { loading, error, photos, username } = this.props
     if (loading) {
       return <List component={LoadingIndicator} /> }
     if (error) {
       return  <CenteredSection style={{padding:'5em'}}>
                   {error} <p>{'...Please, try again!'}</p>
               </CenteredSection>
     }
     if (photos) {
       console.log(photos[60], this.props.limit)
      return (
        <div style={{display:'flex', height: '40em'}}>
            <HomePage></HomePage>
         <Grid style={{overflow:'scroll'}}>
             {
               photos.map((photo) => {

                 //console.log(photo.url_z, ++i)
                 const photo_id=photo.id
                 const {farm, server, url_id} = this.singleRoute(photo)
                 return (
                   <div key={photo.id}>
                       <Link
                        style={{textDecoration: 'none'}}
                        to={`/${username}/${photo_id}/${farm}/${server}/${url_id}`}>
                        <Item photo={photo} />
                       </Link>
                   </div>
                 )})
              }
           </Grid>
        </div>
       );
     }
     return <div></div>;
   }
};

export function mapDispatchToProps(dispatch) {
 console.log('mapDispatchToProps')
 return {
   onPhotoPageLoad:(username,term,limit) => {
    dispatch(loadPhotos())
    dispatch(fetchPhotos(username,term,limit))
  }
 }
}

const mapStateToProps = (state,ownProps) => {
 return {
  loading: state.loading,
  error:state.error,
  photos:state.photos,
  username:ownProps.params.username,
  term:ownProps.params.term,
  limit:ownProps.params.limit,
 }
}

export default connect( mapStateToProps, mapDispatchToProps)(Photos);
