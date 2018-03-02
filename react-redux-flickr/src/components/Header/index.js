import React from 'react'
import Img from '../../styling-components/Img'
import NavBar from '../../styling-components/NavBar'
import HeaderLink from '../../styling-components/HeaderLink'
import FlickrBanner from './TwitterFlickrFDG.jpg'
import messages from './messages'

class Header extends React.Component {
  render() {
    return (
      <div>
        <div >
          <NavBar>
          <a href="https://twitter.com/Flickr?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
            <Img src={FlickrBanner} alt="flickr-Logo" />
          </a>
          <div>
            <HeaderLink to="/">
              <h4>  {messages.home} </h4>
            </HeaderLink>
            <HeaderLink to="/services">
              <h4> {messages.services}</h4>
            </HeaderLink>
          </div>
          </NavBar>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Header;
