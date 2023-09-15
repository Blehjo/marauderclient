import { ChangeEvent, Component, FormEvent, Fragment } from 'react';
import { Badge, Card, Col, Form, Image, Modal, Row } from 'react-bootstrap';

import { ArrowsFullscreen, Globe, Rocket, Send } from 'react-bootstrap-icons';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { AContainer, BadgeContainer, CardContainer, ChatContainer, ModalContainer, TextContainer } from "../../styles/poststab/poststab.styles";
import { utcConverter } from '../../utils/date/date.utils';

import { ChatState } from '../../store/chat/chat.reducer';
import { Chat } from '../../store/chat/chat.types';
import { ChatComment } from '../../store/chatcomment/chatcomment.types';
import { CommentContainer, UserCommentContainer } from '../../styles/modal/modal.styles';
import { UserChatComment } from '../../store/userchatcomment/userchatcomment.types';

type ChatsTabProps = {
    show: boolean;
    showDelete: boolean;
    chatId: number | null;
    commentValue: string;
    mediaLink: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: File | null;
}

export class UserChatsTab extends Component<any, ChatsTabProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            show: false,
            showDelete: false,
            chatId: null,
            commentValue: "",
            mediaLink: "",
            imageSource: null,
            imageFile: null
        }
        this.handleChatCommentSubmit = this.handleChatCommentSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showPreview = this.showPreview.bind(this);
    }

    handleChatCommentSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const { commentValue, imageFile } = this.state;
        this.props.createUserComment(commentValue, imageFile!, this.props.chats.singleChat?.chatId!);
        this.setState({
            ...this.state, commentValue: "", imageFile: null
        })
    }

    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }

    showPreview(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
          const { files } = event.target;
          const selectedFiles = files as FileList;
          let imageFile = selectedFiles[0];
          const reader = new FileReader();
          reader.onload = x => {
            this.setState({
              ...this.state,
              imageFile,
              imageSource: x.target?.result
            });
          }
          reader.readAsDataURL(imageFile);
        } else {
          this.setState({
              ...this.state,
              imageFile: null,
              imageSource: null
          });
        }
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }

    handleClick(chatId: number): void {
        this.props.getChat(chatId);
        this.props.getUserComments(chatId);
        this.setState({
            show: !this.state.show
        });
    }

    componentDidMount(): void {
        if (this.props.marauderId != undefined) {
            this.props.getChats(this.props.marauderId);
        }
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<ChatsTabProps>, snapshot?: any): void {
        if (prevProps.marauderId != this.props.marauderId) {
            this.props.getChats(this.props.marauderId);
        }
    }

    render() {
        const { chats, chatComments, userComments } = this.props;
        const { show } = this.state;
        return (
            <Fragment>
            {
            chats.singleUserChats?.length ?
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1050: 4}}
                >
                    <Masonry>
                    {chats.singleUserChats?.map(({ chatId, title, userId, comments, chatComments, favorites, dateCreated }: Chat) => {
                    return <ChatContainer key={chatId}>
                            <Card style={{ background: 'black', border: '1px solid white', color: 'white' }} key={chatId}>
                            <Card.Img  src={"https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"}/>
                            <Card.ImgOverlay>
                                <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                                <BadgeContainer>
                                    <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} size={15} onClick={() => this.handleClick(chatId)}/></Badge>
                                </BadgeContainer>
                                {
                                    chatComments && <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                        <Globe size={15}/>
                                        {` ${chatComments.length}`}
                                        </Badge>
                                    </BadgeContainer>
                                }
                                {
                                    favorites && <BadgeContainer>
                                        <Badge style={{ color: 'black' }} bg="light">
                                        <Rocket size={15}/>
                                        {` ${favorites.length}`}
                                        </Badge>
                                    </BadgeContainer>
                                }
                                </div>
                                </Card.ImgOverlay>
                                <Card.Body>
                                    <Card.Text>{title}</Card.Text>
                                    <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                </Card.Body>
                            </Card>
                        </ChatContainer>
                    })}
                    </Masonry>
                </ResponsiveMasonry> : 
                <Col xs={12}>
                <Card style={{ color: 'white', textAlign: 'center', background: 'black', border: '1px solid white', padding: '.5rem' }}>
                    <Card.Title>"Currently no chats... "</Card.Title>
                </Card>
                </Col>
                }
                <Modal 
                    size="lg"
                    show={show} 
                    onHide={() => this.handleClose()}
                >
                    <ModalContainer>
                    <Modal.Header closeButton>
                        <Modal.Title >{chats.singleChat?.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row style={{ position: 'relative' }}>
                            <Col md={8}>
                            <Image
                                fluid
                                style={{ borderRadius: '.2rem', objectFit: 'cover', width: '30rem', height: '30rem' }}
                                src="https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"
                            />
                            <UserCommentContainer>
                                {
                                    chats.singleChat?.chatComments.map(({ chatCommentId, chatValue, mediaLink, dateCreated }: ChatComment) => {
                                        return <Card border="light" className="bg-dark mt-2" key={chatCommentId}>
                                            <TextContainer>
                                                <Card.Text>{chatValue}</Card.Text>
                                                <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                            </TextContainer>
                                        </Card>
                                    })
                                }
                            </UserCommentContainer>
                            </Col>
                            <Col>
                                <div>Comments</div>
                                <CommentContainer>
                                <div style={{ height: "65%", overflowY: "auto" }}>
                                {
                                    userComments.comments?.map(({ userChatCommentId, commentValue, mediaLink, dateCreated, user }: UserChatComment) => {
                                        return <Card border="light" className="bg-dark mt-2" key={userChatCommentId}>
                                            <TextContainer>
                                                <AContainer href={`/profile/${user.userId}`}>
                                                <Row xs={2}>
                                                    <Col xs={2}>
                                                    <Card.Img src={`https://localhost:7144/images/${user.imageLink!}`}/>
                                                    </Col>
                                                    <Col>
                                                    <Card.Text>{user.username}</Card.Text>
                                                    </Col>
                                                </Row>
                                                </AContainer>
                                                <Card.Text>{commentValue}</Card.Text>
                                            </TextContainer>
                                        </Card>
                                    })
                                }
                                </div>
                                <Form style={{ margin: 'auto', position: "absolute", bottom: "0" }} key={chats.singleChat?.chatId} onSubmit={this.handleChatCommentSubmit}>
                                <Row style={{ marginBottom: '3rem', justifyContent: 'center' }} xs={1}>
                                    <Col xs={12}>
                                        <Row style={{ marginBottom: '1rem', justifyContent: 'center' }}>
                                            <Col xs={12}>
                                                <Form.Group>
                                                    <Form.Control style={{ height: '.5rem' }} name="commentValue" as="textarea" onChange={this.handleChange} placeholder=" Write your comment here" />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row style={{ justifyContent: 'center' }}>
                                            <Col xs={12}>
                                                <Form.Group className="mb-3" controlId="formMedia">
                                                    <Form.Control onChange={this.showPreview} name="mediaLink" as="input" accept="image/*" type="file" placeholder="Media" />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={12}>
                                        <button style={{ textAlign: 'center', width: '100%', height: '100%'}} className="btn btn-light" type="submit">
                                            <Send/>
                                        </button>
                                    </Col>                
                                </Row>
                            </Form>
                            </CommentContainer>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <button className="btn btn-dark" onClick={() => this.handleClose()}>
                        Close
                    </button>
                    <a href={`/chats/${chats.singleChat?.chatId}`} style={{ textDecoration: 'none', color: 'white' }} className="btn btn-dark" >
                        See chat
                    </a>
                    </Modal.Footer>
                    </ModalContainer>
                </Modal>
            </Fragment>
        );
    }
}