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
            M A R A U D E R S {}
          </TextContainer>
          <Image style={{ borderRadius: '1rem', objectFit: 'cover', width: '100rem', height: '45rem' }} src="/home.jpeg"/>
        </ImageContainer>
          <ImageContainer>
          <TextContainer>
              DEVICES
            </TextContainer>
            <Image style={{ borderRadius: '1rem', objectFit: 'cover', width: '100rem', height: '30rem' }} src="/arduino-home-page.jpg" />
          </ImageContainer>
          <ImageContainer>
            <TextContainer>
              IoThings
            </TextContainer>
            <Image style={{ borderRadius: '1rem', objectFit: 'cover', width: '100rem', height: '30rem' }} src="/arduino-device.jpeg" />
          </ImageContainer>
          <ImageContainer>
            <TextContainer>
              DASHBOARD
            </TextContainer>
            <Image style={{ borderRadius: '1rem', objectFit: 'cover', width: '100rem', height: '30rem' }} src="/dashboard.jpeg" />
          </ImageContainer>
          <Row xs={1}>
          <Col sm={12} md={6}>
          <ImageContainer>
            <TextContainer>
              ESP-32
            </TextContainer>
            <Image style={{ borderRadius: '1rem', objectFit: 'cover', width: '100rem', height: '30rem' }} src="/esp32-image.jpeg" />
          </ImageContainer>
          </Col>
          <Col sm={12} md={6}>
          <ImageContainer>
            <TextContainer>
              SKETCH
            </TextContainer>
            <Image style={{ borderRadius: '1rem', objectFit: 'cover', width: '100rem', height: '30rem' }} src="/schematics.jpg" />
          </ImageContainer>
          </Col>
          </Row>
      </HomeContainer>
    );
  }
}

export default Index;