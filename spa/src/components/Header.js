import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Fade from 'react-reveal';

class Header extends Component {
  render() {
    if (!this.props.data) return null;
    const project = this.props.data.project;
    const name = this.props.data.name;
    const description = this.props.data.description;
    return (
      <header id="home">
        <ParticlesBg type="circle" bg={true} />
        <div className="row banner">
          <div className="banner-text">
            <Fade bottom>
              <h1 className="responsive-headline">{name}</h1>
            </Fade>
            <Fade bottom duration={1200}>
              <h3>{description}.</h3>
            </Fade>
            <hr />
            <Fade bottom duration={2000}>
              <ul className="social">
                <a
                  href={project}
                  className="button btn project-btn smoothscroll"
                >
                  <i className="fa fa-arrow-circle-o-right"></i> Conitnue
                </a>
              </ul>
            </Fade>
            <iframe
              width="720"
              height="300"
              title="Youtube Link"
              src="https://www.youtube.com/embed/h3unBhNyi1Y"
              alt="123"
            ></iframe>
          </div>
        </div>
        <p className="scrolldown">
          <a className="smoothscroll" href="#selection">
            <i className="icon-down-circle"></i>
          </a>
        </p>
      </header>
    );
  }
}
export default Header;
