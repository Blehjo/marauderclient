import { Component } from "react";
import { Badge, Card, Col, Modal, Row } from "react-bootstrap";
import { ArrowsFullscreen, Chat, Rocket } from "react-bootstrap-icons";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { BadgeContainer, ResponsiveMemoryContainer } from "../../styles/responsivememory/responsivememory.styles";
import { utcConverter } from "../../utils/date/date.utils";
import ModalContent from "../modal/modal.component";

interface IDefaultFormFields {
    commentValue: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    show: boolean;
}

class ResponsiveMemory extends Component<any, IDefaultFormFields> {
    state: IDefaultFormFields = {
        commentValue: "",
        imageSource: null,
        imageFile: null,
        show: false,
    }

    handleLike(postId: number, type: string): void {
        this.props.likePost(postId, type);
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }

    handleClick(id: number, type: string): void {
        if (type === "chat") {
            this.props.getChat(id);
            this.props.getChatComments(id);
        } else if (type === "post") {
            this.props.getPost(id);
            this.props.getPostComments(id);
        } 
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
                            <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} onClick={() => this.handleClick(postId, type)} size={15}/></Badge>
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
        const { chatId, title, type, userId, comments, chatComments, favorites, dateCreated, getChat } = prop;
        return (
            <Card bg="dark" style={{ margin: '.3rem', color: 'white'}} key={chatId}>
                <Row>
                <Card.Img  src={"https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"}/>
                <Card.ImgOverlay>
                <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                <Col>
                <BadgeContainer>
                    <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} size={15} onClick={() => this.handleClick(chatId, type)}/></Badge>
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
            <Card bg="dark" style={{ margin: '.3rem', color: 'white'}}>
                <Card.Img src={mediaLink ? imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                <Card.ImgOverlay>
                    <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                        <BadgeContainer>
                            <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} onClick={() => this.handleClick(postId, type)} size={15}/></Badge>
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
        const content: any = [];
        const { posts, chats, profiles, favorites } = this.props;

        if (posts && posts.length > 0) {
            for (let i = 0; i < posts.length; i++) {
                content.push(this.postFunction(posts[i]));
            }
        } else if (chats && chats.length > 0) {
            for (let i = 0; i < chats.length; i++) {
                content.push(this.chatFunction(chats[i]));
            }
        } else if (profiles && profiles.length > 0) {
            for (let i = 0; i < profiles.length; i++) {
                content.push(this.profileFunction(profiles[i]));
            }
        } else if (favorites && favorites.length > 0) {
            for (let i = 0; i < favorites.favorites?.length!; i++) {
                if (favorites.favorites[i].type === "post") {
                    content.push(this.postFunction(favorites.favorites[i]))
                }
                if (favorites.favorites[i].type === "chat") {
                    content.push(this.chatFunction(favorites.favorites[i]))
                }
            }
        } else {
            content.push(
                <Card key="default" bg="dark" style={{ margin: '.3rem', textAlign: 'center', color: 'white'}} >
                    <Card.Body>
                        <Card.Text>Currently no content</Card.Text>
                    </Card.Body>
                </Card>
            )
        }

        return content;
    }

    render() {
        return (
            <ResponsiveMemoryContainer>
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 3, 1050: 4 }}>
                    <Masonry>
                        {this.checkType()}
                    </Masonry>
                <Modal
                    size="lg"
                    show={this.state.show} 
                    onHide={() => this.handleClose()}
                    >
                    <ModalContent show={this.state.show} { ...this.props }/>
                </Modal>
                </ResponsiveMasonry>
            </ResponsiveMemoryContainer>
        );
    }
}

export default ResponsiveMemory;