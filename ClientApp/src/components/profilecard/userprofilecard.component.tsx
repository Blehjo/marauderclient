import { ChangeEvent, Component, FormEvent } from "react";
import { Card, Row, Col, Modal, Form, Image } from "react-bootstrap";
import { Pen } from "react-bootstrap-icons";
import { editUser } from "../../utils/api/user.api";
import { SingleProfileProps } from "../../pages/profile/[id]";
import { Community } from "../../store/community/community.types";
import { AContainer } from "../../styles/poststab/poststab.styles";

export class UserProfileCard extends Component<any> {
    constructor(props: any) {
        super(props);
    }
    
    componentDidMount(): void {
        if (this.props.marauderId) {
            this.props.getMarauder(this.props.marauderId);
            this.props.fetchCommunities(this.props.marauderId);
        }
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.marauderId != this.props.marauderId) {
            this.props.getMarauder(this.props.marauderId);
        }
    }

    render() {
        const { marauder, communities } = this.props;
        return (
            <Card style={{ color: 'white', background: 'black', border: '.1rem solid white' }} key={"userId"}>
                <Card.Img style={{ height: '20rem', width: 'auto', objectFit: 'cover', position: 'relative' }} variant="top" src={marauder.singleMarauder?.imageSource ? marauder.singleMarauder.imageSource : "https://www.cooperhewitt.org/wp-content/uploads/2018/07/20914_472d45b4ae377c5f_b1.jpg"} /> 
                <Card.Body>
                    <Row xs={2}>
                        <Col xs={9}>
                            <Card.Link style={{ textDecoration: 'none', color: 'white' }} href={`/profile/${marauder.singleMarauder?.userId}`}>
                                <Card.Title>{marauder.singleMarauder?.username}</Card.Title>
                                <hr></hr>
                                <Card.Text>{marauder.singleMarauder?.about}</Card.Text>
                                {communities.communities.length > 0 && <hr></hr>}
                                <>
                                {
                                communities.communities?.map(({ communityId, communityName, description, imageSource }: Community) => (
                                    <AContainer href={`/communities/${communityId}`}>
                                    <Row>
                                        <Col xs={2}>
                                            <Image style={{ width: '2rem', height: '2rem', objectFit: 'fill' }} src={imageSource}/>
                                        </Col>
                                        <Col>
                                            <Card.Text key={communityId}>{communityName}</Card.Text>
                                        </Col>
                                    </Row>
                                    </AContainer>
                                ))
                                }
                                </>
                            </Card.Link>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '1rem' }} xs={2}>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}