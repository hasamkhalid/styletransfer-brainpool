import React, { Component } from 'react';
import Fade from 'react-reveal';

class Footer extends Component {
  render() {
    if (!this.props.data) return null;
    return (
      <footer>
        <div className="row">
          <Fade bottom>
            <div className=""></div>
          </Fade>

          <div id="go-top">
            <a className="smoothscroll" title="Back to Top" href="#home">
              <i className="icon-up-open"></i>
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
