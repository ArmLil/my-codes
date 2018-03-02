import React from 'react'
import Iframe from '../../styling-components//Iframe'
import HomePage from '../../containers/HomePage'

export default class FeaturePage extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div style={{display:'flex', height: '40em'}}>
        <HomePage></HomePage>
        <Iframe src="https://mashupguide.net/1.0/html/ch06.xhtml" />
      </div>
    );
  }
}
