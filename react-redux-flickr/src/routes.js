import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Header from './components/Header'
import ServicePage from './containers/ServicePage'
import HomePage from './containers/HomePage'
import SinglePage from './containers/SinglePage'
import Photos from './containers/Photos'

export default (
    <Route path="/" component={Header}>
      <IndexRoute component={HomePage}/>
      <Route path="/services" component={ServicePage}/>
      <Route path="/:username/:term/:limit" component={Photos} />
      <Route path="/:username/:photo_id/:farm/:server/:url_id" component={SinglePage}/>
    </Route>
)
