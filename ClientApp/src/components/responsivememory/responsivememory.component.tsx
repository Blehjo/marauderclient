import { Component, ReactNode } from "react";
import { Badge, Card, Col, Modal, Row } from "react-bootstrap";
import { ArrowsFullscreen, Chat, Collection, DeviceHdd, Envelope, Person, Plus, Rocket } from "react-bootstrap-icons";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { Chat as ChatContent } from "../../store/chat/chat.types";
import { Community } from "../../store/community/community.types";
import { Gltf } from "../../store/gltf/gltf.types";
import { Marauder } from "../../store/marauder/marauder.types";
import { Post } from "../../store/post/post.types";
import { BadgeContainer, ResponsiveMemoryContainer } from "../../styles/responsivememory/responsivememory.styles";
import { utcConverter } from "../../utils/date/date.utils";
import MessagemodalComponent from "../messagemodal/messagemodal.component";
import ModalContent from "../modal/modal.component";
import { AContainer } from "../../styles/poststab/poststab.styles";

interface IDefaultFormFields {
    commentValue: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    show: boolean;
    openModal: boolean;
    messageValue: string;
    type: string;
    contentId: number | null;
}

class ResponsiveMemory extends Component<any, IDefaultFormFields> {
    state: IDefaultFormFields = {
        commentValue: "",
        imageSource: null,
        imageFile: null,
        show: false,
        openModal: false,
        messageValue: "",
        type: "",
        contentId: null
    }

    handleLike(postId: number, type: string): void {
        this.props.likePost(postId, type);
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }

    handleClick(id: number, type?: string): void {
        if (type === "chat") {
            this.props.getChat(id);
            this.props.getComments(id);
            this.props.getUserComments(id);
            this.setState({
                ...this.state, type: "chats", contentId: id
            });
        } else if (type === "post") {
            this.props.getPost(id);
            this.props.getComments(id);
            this.setState({
                ...this.state, type: "posts", contentId: id
            });
        } else if (type === "gltf") {
            this.props.getFile(id);
            this.props.getComments(id);
            this.setState({
                ...this.state, type: "gltfs", contentId: id
            });
        } else {
            this.props.getCommunity(id);
            this.props.getMembers(id);
            this.setState({
                ...this.state, type: "communities", contentId: id
            });
        }
        this.setState({
            show: !this.state.show
        });
    }

    handleProfile(userId: string): void {
        this.props.getMarauder(userId);
    }

    openMessage() {
        this.setState({
            openModal: !this.state.openModal
        })
    }

    profileFunction(prop: Marauder) {
        const { userId, username, imageLink, posts, devices, about, imageSource } = prop;
        return (
            <Card key={userId} style={{ background: 'black', border: 'solid 1px white', padding: '.5rem', margin: '1rem', color: 'white'}}>
                <Card.Img src={imageLink ? imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                <Card.ImgOverlay>
                    <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                    <BadgeContainer>
                        <a href={`/profile/${userId}`}>
                            <Badge style={{ color: 'black' }} bg="light"><Person style={{ cursor: 'pointer' }} size={15}/></Badge>
                        </a>
                        </BadgeContainer>
                        <BadgeContainer>
                            <Badge style={{ color: 'black' }} bg="light">
                                <Envelope 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={() => {
                                        this.handleProfile(userId);
                                        this.openMessage();
                                    }} 
                                    size={15}
                                />
                            </Badge>
                        </BadgeContainer>
                        {
                            <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                <Collection size={15}/>
                                {` ${posts?.length > 0 ? posts?.length : ""}`}
                                </Badge>
                            </BadgeContainer>
                        }
                        {
                            <BadgeContainer>
                                <Badge style={{ color: 'black' }} bg="light">
                                <DeviceHdd style={{ cursor: 'pointer' }} size={15}/>
                                {` ${devices?.length > 0 ? devices?.length : ""}`}
                                </Badge>
                            </BadgeContainer>
                        }
                    </div>
                </Card.ImgOverlay>
                <Card.Body>
                    <Card.Text>{username}</Card.Text>
                    <Card.Text>{about}</Card.Text>
                </Card.Body>
            </Card>
        )
    }

    chatFunction(prop: ChatContent) {
        const { chatId, title, type, userId, comments, chatComments, favorites, dateCreated, user } = prop;
        return (
            <Card key={chatId} style={{ background: 'black', border: 'solid 1px white', padding: '.5rem', margin: '.3rem', color: 'white'}}>
                <Row>
                <Card.Img  src={"https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"}/>
                <Card.ImgOverlay>
                <div style={{ cursor: "pointer", position: "absolute", left: "0.5rem", top: "0.5rem" }}>
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
                    <Row style={{ position: 'relative' }} xs={3}>
                        <Col xs={3}>
                        <Card.Img style={{ width: '2rem', height: '2rem', objectFit: 'cover' }} src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/images/${user.imageLink!}`}/>
                        </Col>
                        <Col>
                        <AContainer href={`/profile/${user.userId}`} style={{ marginBottom: '.5rem', marginLeft: '-2rem' }}>{user.username}</AContainer>
                        </Col>
                        <Col>
                        <Card.Text style={{ position: 'absolute', right: '0.5rem' }}>{utcConverter(dateCreated)}</Card.Text>
                        </Col>
                    </Row>
                    <Card.Text>{title}</Card.Text>
                </Card.Body>
                </Row>
            </Card>
        )
    }
    
    postFunction(prop: Post) {
        const { postId, postValue, mediaLink, comments, favorites, type, imageSource, user } = prop;
        return (
            <Card key={postId} style={{ background: 'black', border: 'solid 1px white', padding: '.5rem', margin: '.3rem', color: 'white'}}>
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
                    <Row style={{ position: 'relative' }} xs={2}>
                        <Col xs={3}>
                        <Card.Img style={{ width: '2rem', height: '2rem', objectFit: 'cover' }} src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/images/${user.imageLink!}`}/>
                        </Col>
                        <Col>
                        <AContainer href={`/profile/${user.userId}`} style={{ marginBottom: '.5rem', marginLeft: '-1rem' }}>{user.username}</AContainer>
                        </Col>
                    </Row>
                    <Card.Text style={{ cursor: 'pointer'}}>{postValue}</Card.Text>
                </Card.Body>
            </Card>
        )
    }
    
    gltfFunction(prop: Gltf) {
        const { gltfId, fileInformation, mediaLink, gltfComments, favorites, type, imageSource, user } = prop;
        return (
            <Card key={gltfId} style={{ background: 'black', border: 'solid 1px white', padding: '.5rem', margin: '.3rem', color: 'white'}}>
                <Card.Img src={"https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                <Card.ImgOverlay>
                    <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                        <BadgeContainer>
                            <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} onClick={() => this.handleClick(gltfId!, type)} size={15}/></Badge>
                        </BadgeContainer>
                        {
                            <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                <Chat size={15}/>
                                {` ${gltfComments?.length > 0 ? gltfComments?.length : ""}`}
                                </Badge>
                            </BadgeContainer>
                        }
                        {
                            <BadgeContainer>
                                <Badge style={{ color: 'black' }} bg="light">
                                <Rocket style={{ cursor: 'pointer' }} onClick={() => this.handleLike(gltfId!, type)} size={15}/>
                                {` ${favorites?.length > 0 ? favorites?.length : ""}`}
                                </Badge>
                            </BadgeContainer>
                        }
                    </div>
                </Card.ImgOverlay>
                <Card.Body>
                    <Row style={{ position: 'relative' }} xs={2}>
                        <Col xs={3}>
                        <Card.Img style={{ width: '2rem', height: '2rem', objectFit: 'cover' }} src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/images/${user.imageLink!}`}/>
                        </Col>
                        <Col>
                        <AContainer href={`/profile/${user.userId}`} style={{ marginBottom: '.5rem', marginLeft: '-1rem' }}>{user.username}</AContainer>
                        </Col>
                    </Row>
                    <Card.Text>{fileInformation}</Card.Text>
                </Card.Body>
            </Card>
        )
    }
    
    communityFunction(prop: Community) {
        const { communityId, communityName, description, mediaLink, channels, members, imageSource } = prop;
        return (
            <Card key={communityId} style={{ background: 'black', border: 'solid 1px white', padding: '.5rem', margin: '.3rem', color: 'white'}}>
                <Card.Img src={mediaLink ? imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                <Card.ImgOverlay>
                    <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                        <BadgeContainer>
                            <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} onClick={() => this.handleClick(communityId)} size={15}/></Badge>
                        </BadgeContainer>
                        {
                            <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                <Person size={15}/>
                                {` ${members?.length > 0 ? members?.length : ""}`}
                                </Badge>
                            </BadgeContainer>
                        }
                        {
                            <BadgeContainer>
                                <Badge style={{ color: 'black' }} bg="light">
                                <Plus onClick={() => this.props.joinCommunity(communityId)} size={15}/>
                                </Badge>
                            </BadgeContainer>
                        }
                    </div>
                </Card.ImgOverlay>
                <Card.Body>
                    <Card.Text>{communityName}</Card.Text>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>
            </Card>
        )
    }

    checkType(): Array<ReactNode> {
        const content: any = [];
        const { posts, chats, profiles, favorites, communities, gltfs } = this.props;

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
        } else if (communities && communities.length > 0) {
            for (let i = 0; i < communities.length; i++) {
                content.push(this.communityFunction(communities[i]));
            }
        } else if (gltfs && gltfs.length > 0) {
            for (let i = 0; i < gltfs.length; i++) {
                content.push(this.gltfFunction(gltfs[i]))
            }
        } else if (favorites && favorites.length > 0) {
            for (let i = 0; i < favorites.length; i++) {
                if (favorites[i].type === "post") {
                    content.push(this.postFunction(favorites[i]))
                }
                if (favorites[i].type === "chat") {
                    content.push(this.chatFunction(favorites[i]))
                } 
                if (favorites[i].type === "gltf") {
                    content.push(this.gltfFunction(favorites[i]))
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

    componentDidMount(): void {
        this.props.getAll();
    }

    render() {
        const { type, contentId } = this.state;
        return (
            <ResponsiveMemoryContainer>
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 3, 1050: 4 }}>
                    <Masonry>
                        {this.checkType()}
                    </Masonry>
                <Modal
                    size="lg"
                    show={this.state.show} 
                    onHide={() => this.handleClose}
                    variant={'dark'}
                    className="deviceModal"
                >
                    <ModalContent show={this.state.show} handleClose={this.handleClose} { ...this.props }/>
                    <Modal.Footer style={{ background: 'black', border: 'white solid 1px' }} >
                    <button className="btn btn-dark" onClick={() => this.handleClose()}>
                        Close
                    </button>
                    <button className="btn btn-dark" >
                        <a style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }} href={`/${type}/${contentId}`}>
                        {`See ${type}`}
                        </a>
                    </button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    className="deviceModal"
                    size="lg"
                    show={this.state.openModal} 
                    onHide={() => this.openMessage()}
                >
                    <MessagemodalComponent openMessage={this.openMessage} openModal={this.state.openModal} { ...this.props }/>
                </Modal>
                </ResponsiveMasonry>
            </ResponsiveMemoryContainer>
        );
    }
}

export default ResponsiveMemory;