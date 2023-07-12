import { ChangeEvent, Component, FormEvent } from "react";
import { Card, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { Send } from "react-bootstrap-icons";
import { CommentContainer, ModalContainer, TextContainer } from "../../styles/modal/modal.styles";
import { Community } from "../../store/community/community.types";
import { utcConverter } from "../../utils/date/date.utils";
import { Post } from "../../store/post/post.types";
import { Chat } from "../../store/chat/chat.types";

interface IModalContent {
    show: boolean;
    commentValue: string;
    mediaLink: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: File | null;
}

class ModalContent extends Component<any, IModalContent> {
    constructor(props: any) {
        super(props);
        this.state = {
            show: this.props.show,
            commentValue: "",
            mediaLink: "",
            imageSource: null,
            imageFile: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.showPreview = this.showPreview.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }

    handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const { commentValue, imageFile } = this.state;
        this.props.createComment(commentValue, imageFile, this.props.singlePost?.postId);
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

    chatFunction(prop: Chat) {
        const { chatId, title, type, userId, comments, chatComments, favorites, dateCreated } = prop;
        return (
            <ModalContainer>
                <Modal.Header closeButton>
                    <Modal.Title >Crew Logs</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row style={{ position: 'relative' }}>
                        <Col md={8}>
                        <Image
                            fluid
                            style={{ borderRadius: '.2rem', objectFit: 'cover', width: '30rem', height: '30rem' }}
                            src="https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"
                        />
                            <Card style={{ marginTop: "1rem", color: 'white' }} className="bg-dark" key={chatId}>
                            <TextContainer>
                            {title}
                            </TextContainer>
                        </Card>
                        </Col>
                        <Col>
                        <CommentContainer>
                        <div>Comments</div>
                        <div style={{ height: "65%", overflowY: "auto" }}>
                        {
                            chatComments?.map(({ chatCommentId, chatValue, mediaLink, dateCreated }) => {
                                return <Card className="bg-dark" key={chatCommentId}>
                                    <TextContainer>
                                        <Card.Text>{chatValue}</Card.Text>
                                        <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                    </TextContainer>
                                </Card>
                            })
                        }
                        </div>
                        <Form style={{ margin: 'auto', position: "absolute", bottom: "0" }} key={chatId} onSubmit={this.props.postComment}>
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
                                    <button style={{ textAlign: 'center', width: "100%" }} className="btn btn-light" type="submit">
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
                <a href={`/singlechat/${chatId}`} style={{ textDecoration: 'none', color: 'white' }} className="btn btn-dark" onClick={() => this.handleClose()}>
                    Single View
                </a>
                </Modal.Footer>
            </ModalContainer>
        )
    }

    postFunction(prop: Post) {
        const { postId, postValue, mediaLink, favorites, type, imageSource } = prop;
        const { comments } = this.props;
        return (
            <Modal 
                    size="lg"
                    show={this.state.show} 
                    onHide={() => this.handleClose()}
                >
                    <ModalContainer>
                    <Modal.Header closeButton>
                        <Modal.Title >Marauder Log</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={8}>
                            <Image
                                fluid
                                style={{ borderRadius: '.2rem', objectFit: 'cover', width: '30rem', height: '30rem' }}
                                src={mediaLink ? imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"} 
                            />
                            <Card style={{ marginTop: "1rem", color: 'white' }} className="bg-dark" key={postId}>
                                <TextContainer>
                                {postValue}
                                </TextContainer>
                            </Card>
                            </Col>
                            <Col>
                            <CommentContainer>
                            <div>Comments</div>
                            <div style={{ height: "65%", overflowY: "auto" }}>
                            {
                                comments?.map(({ commentId, commentValue, mediaLink, dateCreated }) => {
                                    return <Card className="bg-dark mt-1" key={commentId}>
                                        <TextContainer>
                                            <Card.Text>{commentValue}</Card.Text>
                                            <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                        </TextContainer>
                                    </Card>
                                })
                            }
                            </div>
                            <Form style={{ margin: 'auto', position: "absolute", bottom: "0" }} key={postId} onSubmit={this.handleSubmit}>
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
                    <button className="btn btn-dark" >
                        <a style={{ textDecoration: 'none', color: 'white' }} href={`/singlepost/${postId}`}>
                        Single View
                        </a>
                    </button>
                    </Modal.Footer>
                    </ModalContainer>
                </Modal>
        );
    }

    communityFunction(prop: Community) {
        const { communityName, description, communityId, members, imageSource, mediaLink  } = prop;
        return (
            <ModalContainer>
                <Modal.Header closeButton>
                    <Modal.Title >{communityName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row style={{ position: 'relative' }}>
                        <Col md={8}>
                        <Image
                            fluid
                            style={{ borderRadius: '.2rem', objectFit: 'cover', width: '30rem', height: '30rem' }}
                            src={mediaLink ? imageSource : "https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"}
                        />
                            <Card style={{ marginTop: "1rem", color: 'white' }} className="bg-dark" key={communityId}>
                            <TextContainer>
                            {description}
                            </TextContainer>
                        </Card>
                        </Col>
                        <Col>
                        <CommentContainer>
                        <div>Members</div>
                        <div style={{ height: "65%", overflowY: "auto" }}>
                        {
                            members?.map(({ memberId, user, dateCreated }) => {
                                console.log(memberId)
                                return <Card className="bg-dark" key={memberId}>
                                    <TextContainer>
                                        <Card.Text>{user.username}</Card.Text>
                                        <Card.Text>Joined: {utcConverter(dateCreated)}</Card.Text>
                                    </TextContainer>
                                </Card>
                            })
                        }
                        </div>
                        </CommentContainer>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <button className="btn btn-dark" onClick={() => this.handleClose()}>
                    Close
                </button>
                <a href={`/singlecommunity/${communityId}`} style={{ textDecoration: 'none', color: 'white' }} className="btn btn-dark" onClick={() => this.handleClose()}>
                    Single View
                </a>
                </Modal.Footer>
            </ModalContainer>
        )
    }

    checkType() {
        const { singlePost, singleChat, singleCommunity } = this.props;
        if (singlePost != undefined) {
            return this.postFunction(singlePost);
        } else if (singleChat != undefined) {
            return this.chatFunction(singleChat);
        } else if (singleCommunity != undefined) {
            return this.communityFunction(singleCommunity);
        }
    }

    // componentDidMount(): void {
    //     this.props.getPostComments(postId);
    // }

    // componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<IModalContent>, snapshot?: any): void {
    //     if (prevProps.comments.length != this.props.comments.length) {
    //         this.props.getPostComments(postId);
    //     }
    // }

    render() {
        return (
            <>
                {this.checkType()}
            </>
        );
    }
}

export default ModalContent;