import { photosLoaded, photoLoadingError } from '../../actions'
import request from '../../utils/request'

export function fetchPhotos(username,term,limit) {
  const FLICKR_ROOT = 'https://api.flickr.com/services/rest/?'
  const FLICKR_METHOD_PHOTOS_SEARCH = 'flickr.photos.search'
  const offset = '0';

  let uri = `${FLICKR_ROOT}`
  uri += `method=${FLICKR_METHOD_PHOTOS_SEARCH}`
  uri += `&api_key=${username}`
  uri += `&tags=${term}`
  uri += `&per_page=${limit}`
  uri += `&page=${offset === 0 ? 1 : offset * limit}`
  uri += '&format=json&nojsoncallback=1'
  uri +=
    '&extras=description,license,date_upload,date_taken,owner_name,icon_server,original_format,last_update,geo,tags,machine_tags,o_dims,views,media,path_alias,url_sq,url_t,url_s,url_q,url_m,url_n,url_z,url_c,url_l,url_o'
  console.log({uri})

  return function (dispatch) {
    return request(uri)
      .then(result => {
        if (result.stat === 'fail') dispatch(photoLoadingError(result.message));
        else dispatch(photosLoaded(result.photos.photo));
      }
    )
  }
}
