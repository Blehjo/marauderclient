import { Component } from "react";
import { HomeContainer, ImageContainer, TextContainer } from "../styles/home/home.styles";
import { Col, Image } from "react-bootstrap";
import { Row } from "reactstrap";


class Index extends Component {
  render() {
    return (
      <HomeContainer>
        <ImageContainer>
          <TextContainer>
            WELCOME TO CAPSULE
          </TextContainer>
          <Image style={{ borderRadius: '.2rem' }} src="/home.jpg"/>
        </ImageContainer>
        <Row xs={1}>
          <ImageContainer>
          <TextContainer>
              DEVICES
            </TextContainer>
            <Image style={{ borderRadius: '.2rem', objectFit: 'cover', width: '100rem', height: '30rem' }} src="/arduino-home-page.jpg" />
          </ImageContainer>
          <ImageContainer>
            <TextContainer>
              IoThings
            </TextContainer>
            <Image style={{ borderRadius: '.2rem', objectFit: 'cover', width: '100rem', height: '30rem' }} src="/arduino-device.jpeg" />
          </ImageContainer>
          <ImageContainer>
            <TextContainer>
              INTERACTIVE DASHBOARD
            </TextContainer>
            <Image style={{ borderRadius: '.2rem', objectFit: 'cover', width: '100rem', height: '30rem' }} src="/dashboard.jpeg" />
          </ImageContainer>
          <Col xs={6}>
          <ImageContainer>
            <TextContainer>
              ESP-32
            </TextContainer>
            <Image style={{ borderRadius: '.2rem', objectFit: 'cover', width: '100rem', height: '30rem' }} src="/esp32-image.jpeg" />
          </ImageContainer>
          </Col>
          <Col xs={6}>
          <ImageContainer>
            <TextContainer>
              SCHEMATICS
            </TextContainer>
            <Image style={{ borderRadius: '.2rem', objectFit: 'cover', width: '100rem', height: '30rem' }} src="/schematics.jpg" />
          </ImageContainer>
          </Col>
        </Row>
      </HomeContainer>
    );
  }
}

export default Index;