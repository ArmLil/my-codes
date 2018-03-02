import request from '../../utils/request'
import { singleLoadingError, singleLoaded } from '../../actions'

export function searchSinglePhoto(username, photo_id) {
  const FLICKR_ROOT = 'https://api.flickr.com/services/rest/?'
  const FLICKR_METHOD_PHOTOS_GET_INFO = 'flickr.photos.getInfo'

  let uri = `${FLICKR_ROOT}`
    uri += `method=${FLICKR_METHOD_PHOTOS_GET_INFO}`
    uri += `&api_key=${username}`
    uri += `&photo_id=${photo_id}`
    uri += '&format=json&nojsoncallback=1'
  // const HAYSTACK_ROOT = 'http://localhost:22024//api/search/'
  // let uri = `${HAYSTACK_ROOT}`
  //     uri += `${photo_id}`

  return function (dispatch) {
    return request(uri).then(
      result => {
        if (result.stat === 'fail') dispatch(singleLoadingError(result.message))
        else dispatch(singleLoaded(result))
      }
    )
  }
}
