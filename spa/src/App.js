import React, { Component } from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Selection from './components/Selection';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: 'bar',
      appData: {},
    };

    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);
  }

  getappData() {
    $.ajax({
      url: './appData.json',
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ appData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
        alert(err);
      },
    });
  }

  componentDidMount() {
    this.getappData();
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state.appData.main} />
        <Selection data={this.state.appData.main} />
        <Footer data={this.state.appData.main} />
      </div>
    );
  }
}

export default App;
