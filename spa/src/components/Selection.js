import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';
const override = css`
  display: block;
  margin: 10 auto;
  border-color: red;
`;
// src/App.js or any other file where you need to use the API endpoint
const backendApiUrl = 'http://localhost:5000/style_transfer'

class Selection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      message: 'Upload an Image to perform Style Transfer!',
      loader: false,
    };
  }
  deepfakedetect = () => {
    this.setState({
      message: 'Uploading and Verifying...',
      loader: true,
    });
    var self = this;
    fetch(backendApiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: { imagename: 'deepfake', image_base64: this.state.image },
      }),
    })
      .then(function (response) {
        self.setState({
          loader: false,
        });
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(function (json) {
        console.log(json);
        if (json.status === 'success')
          self.setState({
            message: 'The Style Transfer is Successfull!',
            transferedimage: json.image_base64,
          });
        else
          self.setState({
            message: 'Memory Error on Server. Please try again!',
          });
      })
      .catch(function (error) {
        self.setState({
          message: 'Something went wrong. Please try again in a while.',
        });
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      });
  };
  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      var self = this;
      reader.onload = function (upload) {
        self.setState({
          image: upload.target.result,
          message: '',
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    } else
      this.setState({
        message: 'Invalid Image format. Please choose png/jpeg.',
      });
  };
  render() {
    if (!this.props.data) return null;
    const profilepic = 'images/' + this.props.data.image; // change for file icon
    const preview = 'images/' + this.props.data.image2;

    return (
      <section id="selection">
        <div
          className="row main-col"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            className="preview"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <img
                src={this.state.image || preview}
                width="450"
                height="250"
                style={{
                  marginTop: 40,
                  minHeight: 30,
                  marginLeft: 5,
                  paddingTop: 10,
                  fontSize: 17,
                  backgroundColor: '#2F5890',
                  bottom: 0,
                  textAlign: 'center',
                  borderRadius: 25,
                }}
                alt=""
              />
              <img
                src={this.state.transferedimage || preview}
                width="450"
                height="250"
                style={{
                  marginTop: 40,
                  minHeight: 30,
                  marginLeft: 5,
                  paddingTop: 10,
                  fontSize: 17,
                  backgroundColor: '#2F5890',
                  bottom: 0,
                  textAlign: 'center',
                  borderRadius: 25,
                }}
                alt=""
              />
            </div>
            <BeatLoader
              css={override}
              sizeUnit={'px'}
              size={50}
              color={'#2E96B1'}
              loading={this.state.loader}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.state.image && (() => this.deepfakedetect())}
              style={{
                minHeight: 35,
                backgroundColor: (this.state.image && '#FFFFFF') || '#eb575c',
                width: 200,
                bottom: 0,
                marginTop: 10,
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  color: (this.state.value === 1 && '#FFFFFF') || '#000000',
                  textTransform: 'initial',
                  fontFamily: 'SFRegular',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                {'Verify'}
              </div>
            </Button>
            <label
              for="group_image"
              class="custom-file-upload"
              style={{
                cursor: 'pointer',
                marginTop: 10,
                minHeight: 30,
                marginLeft: 0,
                paddingTop: 10,
                paddingBottom: 10,
                color: '#FFFFFF',
                fontSize: 17,
                backgroundColor: '#59962a',
                width: 200,
                bottom: 0,
                textAlign: 'center',
                borderRadius: 10,
              }}
            >
              Choose Image
            </label>
          </div>
          <div
            style={{
              minHeight: 40,
              paddingTop: 15,
              color:
                ((this.state.message === 'The Style Transfer is Successfull!' ||
                  this.state.message === 'The Style Transfer Failed' ||
                  this.state.message ===
                    'Upload an Image to perform Style Transfer!' ||
                  this.state.message === 'Uploading and Verifying...') &&
                  '#46cb18') ||
                'red',
              fontSize: 24,
              bottom: 0,
              fontWeight: 'bold',
              paddingLeft: 10,
              paddingRight: 10,
              textAlign: 'center',
            }}
          >
            {this.state.message}
          </div>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/x-png,"
            style={{ display: 'none' }}
            onChange={this.onImageChange}
            className="filetype"
            id="group_image"
          />
        </div>
      </section>
    );
  }
}
export default Selection;
