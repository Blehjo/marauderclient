import { Component } from "react";
import { Badge, Card, Row, Col } from "react-bootstrap";
import { ArrowsFullscreen, Chat, Rocket } from "react-bootstrap-icons";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { BadgeContainer } from "../../styles/responsivememory/responsivememory.styles";
import { Pilot } from "../../store/pilot/pilot.types";
import { PostRouteProps } from "../../pages/posts";
import { ChatRouteProps } from "../../pages/chats";
import { utcConverter } from "../../utils/date/date.utils";
import { DragAndDropContainer } from "../../styles/draganddrop/draganddrop.styles";

interface IDefaultFormFields {
    commentValue: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    show: boolean;
}

class ResponsiveMemory extends Component<any, IDefaultFormFields> {

    handleLike(postId: number, type: string): void {
        this.props.likePost(postId, type);
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }

    handleClick(postId: number): void {
        this.props.getPost(postId);
        this.props.getComments(postId);
        this.setState({
            show: !this.state.show
        });
    }

    profileFunction(prop: any) {
        const { postId, postValue, mediaLink, comments, favorites, type, imageSource } = prop;
        return (
            <Card bg="dark" style={{ margin: '1rem', color: 'white'}}>
                <Card.Img src={mediaLink ? imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                <Card.ImgOverlay>
                    <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                        <BadgeContainer>
                            <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} onClick={() => this.handleClick(postId)} size={15}/></Badge>
                        </BadgeContainer>
                        {
                            <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                <Chat size={15}/>
                                {` ${comments?.length > 0 ? comments?.length : ""}`}
                                </Badge>
                            </BadgeContainer>
                        }
                        {
                            <BadgeContainer>
                                <Badge style={{ color: 'black' }} bg="light">
                                <Rocket style={{ cursor: 'pointer' }} onClick={() => this.handleLike(postId, type)} size={15}/>
                                {` ${favorites?.length > 0 ? favorites?.length : ""}`}
                                </Badge>
                            </BadgeContainer>
                        }
                    </div>
                </Card.ImgOverlay>
                <Card.Body>
                    <Card.Text>{postValue}</Card.Text>
                </Card.Body>
            </Card>
        )
    }

    chatFunction(prop: any) {
        const { chatId, title, type, userId, comments, chatComments, favorites, dateCreated } = prop;
        return (
            <Card bg="dark" style={{ margin: '1rem', color: 'white'}} key={chatId}>
                <Row>
                <Card.Img  src={"https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"}/>
                <Card.ImgOverlay>
                <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                <Col>
                <BadgeContainer>
                    <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} size={15} onClick={() => this.handleClick(chatId)}/></Badge>
                </BadgeContainer>
                </Col>
                <Col>
                {
                    <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                        <Chat size={15}/>
                        {` ${chatComments?.length > 0 ? chatComments?.length : ""}`}
                        </Badge>
                    </BadgeContainer>
                }
                </Col>
                <Col>
                {
                    <BadgeContainer>
                        <Badge style={{ color: 'black' }} bg="light">
                        <Rocket style={{ cursor: 'pointer' }} onClick={() => this.handleLike(chatId, type)} size={15}/>
                        {` ${favorites?.length > 0 ? favorites?.length : ""}`}
                        </Badge>
                    </BadgeContainer>
                }
                </Col>
                </div>
                </Card.ImgOverlay>
                <Card.Body>
                    <Card.Text>{title}</Card.Text>
                    <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                </Card.Body>
                </Row>
            </Card>
        )
    }
    
    postFunction(prop: any) {
        const { postId, postValue, mediaLink, comments, favorites, type, imageSource } = prop;
        return (
            <Card bg="dark" style={{ margin: '1rem', color: 'white'}}>
                <Card.Img src={mediaLink ? imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                <Card.ImgOverlay>
                    <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                        <BadgeContainer>
                            <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} onClick={() => this.handleClick(postId)} size={15}/></Badge>
                        </BadgeContainer>
                        {
                            <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                <Chat size={15}/>
                                {` ${comments?.length > 0 ? comments?.length : ""}`}
                                </Badge>
                            </BadgeContainer>
                        }
                        {
                            <BadgeContainer>
                                <Badge style={{ color: 'black' }} bg="light">
                                <Rocket style={{ cursor: 'pointer' }} onClick={() => this.handleLike(postId, type)} size={15}/>
                                {` ${favorites?.length > 0 ? favorites?.length : ""}`}
                                </Badge>
                            </BadgeContainer>
                        }
                    </div>
                </Card.ImgOverlay>
                <Card.Body>
                    <Card.Text>{postValue}</Card.Text>
                </Card.Body>
            </Card>
        )
    }

    checkType() {
        const content = [];
        const { posts, chats, profiles } = this.props;

        if (posts != undefined) {
            for (let i = 0; i < posts.length; i++) {
                content.push(this.postFunction(posts[i]));
            }
        } else if (chats != undefined) {
            for (let i = 0; i < chats.length; i++) {
                content.push(this.chatFunction(chats[i]));
            }
        } else if (profiles != undefined) {
            for (let i = 0; i < profiles.length; i++) {
                content.push(this.profileFunction(profiles[i]));
            }
        }

        return content;
    }

    render() {
        return (
            <DragAndDropContainer>

            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 3, 1050: 4 }}>
                <Masonry>
                    {this.checkType()}
                </Masonry>
            </ResponsiveMasonry>
            </DragAndDropContainer>
        );
    }
}

export default ResponsiveMemory;