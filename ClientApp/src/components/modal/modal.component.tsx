import { ChangeEvent, Component, FormEvent } from "react";
import { Card, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { Send } from "react-bootstrap-icons";
import { Chat } from "../../store/chat/chat.types";
import { ChatComment } from "../../store/chatcomment/chatcomment.types";
import { Comment } from "../../store/comment/comment.types";
import { Community } from "../../store/community/community.types";
import { Gltf } from "../../store/gltf/gltf.types";
import { Member } from "../../store/member/member.types";
import { Post } from "../../store/post/post.types";
import { CommentContainer, ModalContainer, TextContainer, UserCommentContainer } from "../../styles/modal/modal.styles";
import { AContainer } from "../../styles/poststab/poststab.styles";
import { utcConverter } from "../../utils/date/date.utils";

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
        this.handleChatCommentSubmit = this.handleChatCommentSubmit.bind(this);
        this.handleGltfCommentSubmit = this.handleGltfCommentSubmit.bind(this);
    }

    handleClose(): void {
        this.props.handleClose();
    }

    handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const { commentValue, imageFile } = this.state;
        this.props.createComment(commentValue, imageFile, this.props.singlePost?.postId);
        this.setState({
            ...this.state, commentValue: "", imageFile: null
        })
    }

    handleChatCommentSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const { commentValue, imageFile } = this.state;
        this.props.createUserComment(commentValue, imageFile, this.props.singleChat?.chatId);
        this.setState({
            ...this.state, commentValue: "", imageFile: null
        })
    }

    handleGltfCommentSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const { commentValue, imageFile } = this.state;
        this.props.createGltfComment(commentValue, imageFile, this.props.singleGltf?.gltfId);
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
        const { chatId, title, type, userId, chatComments, favorites, dateCreated, user } = prop;
        const { comments, userchatcomments } = this.props;
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
                            <Card border="light" style={{ marginTop: "1rem", color: 'white' }} className="bg-dark" key={chatId}>
                            <TextContainer>
                            <Row xs={2}>
                                <Col xs={2}>
                                <Card.Img style={{ width: '2rem', height: '2rem', marginBottom: '1rem' }} src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/images/${user.imageLink!}`}/>
                                </Col>
                                <Col>
                                <Card.Text>{user.username}</Card.Text>
                                </Col>
                            </Row>
                            {title}
                            </TextContainer>
                        </Card>
                        </Col>
                        <Col>
                            <div>Comments</div>
                            <CommentContainer>
                            <div style={{ height: "65%", overflowY: "auto" }}>
                            {
                                userchatcomments?.map(({ commentId, commentValue, mediaLink, dateCreated, user }: Comment) => {
                                    return <Card border="light" className="bg-dark mt-2" key={commentId}>
                                        <TextContainer>
                                            <AContainer href={`/profile/${user.userId}`}>
                                            <Row xs={2}>
                                                <Col xs={2}>
                                                <Card.Img src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/images/${user.imageLink!}`}/>
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
                            <Form style={{ margin: 'auto', position: "absolute", bottom: "0" }} key={chatId} onSubmit={this.handleChatCommentSubmit}>
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
                        <Col>
                        <div>Comments</div>
                        <UserCommentContainer>
                        <div style={{ overflowY: "auto" }}>
                        {
                            comments?.map(({ chatCommentId, chatValue, mediaLink, dateCreated }: ChatComment) => {
                                return <Card border="light" className="bg-dark mt-2" key={chatCommentId}>
                                    <TextContainer>
                                        <Card.Text>{chatValue}</Card.Text>
                                        <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                    </TextContainer>
                                </Card>
                            })
                        }
                        </div>
                        </UserCommentContainer>
                        </Col>
                    </Row>
                </Modal.Body>
                {/* <Modal.Footer>
                <button className="btn btn-dark" onClick={() => this.handleClose()}>
                    Close
                </button>
                <a href={`/chats/${chatId}`} style={{ textDecoration: 'none', color: 'white' }} className="btn btn-dark" onClick={() => this.handleClose()}>
                    See Chat
                </a>
                </Modal.Footer> */}
            </ModalContainer>
        )
    }

    postFunction(prop: Post) {
        const { postId, postValue, mediaLink, favorites, type, imageSource, user } = prop;
        const { comments } = this.props;
        return (
            // <Modal 
            //     size="lg"
            //     show={this.state.show} 
            //     onHide={() => this.handleClose()}
            // >
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
                            <Row xs={2}>
                                <Col xs={2}>
                                <Card.Img style={{ width: '2rem', height: '2rem', marginBottom: '1rem' }} src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/images/${user.imageLink!}`}/>
                                </Col>
                                <Col>
                                <Card.Text>{user.username}</Card.Text>
                                </Col>
                            </Row>
                            <Card.Text>{postValue}</Card.Text>
                            </TextContainer>
                        </Card>
                        </Col>
                        <Col>
                        <div>Comments</div>
                        <CommentContainer>
                        <div style={{ height: "65%", overflowY: "auto" }}>
                        {
                            comments?.map(({ commentId, commentValue, mediaLink, dateCreated, user }: Comment) => {
                                return <Card border="light" className="bg-dark mt-2" key={commentId}>
                                    <TextContainer>
                                        <AContainer href={`/profile/${user.userId}`}>
                                        <Row xs={2}>
                                            <Col xs={2}>
                                            <Card.Img src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/images/${user.imageLink!}`}/>
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
                {/* <Modal.Footer>
                <button className="btn btn-dark" onClick={() => this.handleClose()}>
                    Close
                </button>
                <button className="btn btn-dark" >
                    <a style={{ textDecoration: 'none', color: 'white' }} href={`/posts/${postId}`}>
                    See Post
                    </a>
                </button>
                </Modal.Footer> */}
                </ModalContainer>
            // {/* </Modal> */}
        );
    }

    gltfFunction(prop: Gltf) {
        // const { gltfId, fileInformation, favorites, type, imageSource, user } = prop;
        const { comments, singleGltf,  } = this.props;
        return (
            // <Modal 
            //         size="lg"
            //         show={this.props.show} 
            //         onHide={() => this.handleClose()}
            //     >
                    <ModalContainer>
                    <Modal.Header closeButton>
                        <Modal.Title >Gltf File</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={8}>
                            <Image
                                fluid
                                style={{ borderRadius: '.2rem', objectFit: 'cover', width: '30rem', height: '30rem' }}
                                src={"https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"} 
                            />
                            <Card style={{ marginTop: "1rem", color: 'white' }} className="bg-dark" key={singleGltf?.gltfId}>
                                <TextContainer>
                                <Row xs={2}>
                                    <Col xs={2}>
                                    <Card.Img style={{ width: '2rem', height: '2rem', marginBottom: '1rem' }} src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/images/${singleGltf?.user.imageLink!}`}/>
                                    </Col>
                                    <Col>
                                    <Card.Text>{singleGltf?.user.username}</Card.Text>
                                    </Col>
                                </Row>
                                {singleGltf?.fileInformation}
                                </TextContainer>
                            </Card>
                            </Col>
                            <Col>
                            <div>Comments</div>
                            <CommentContainer>
                            <div style={{ height: "65%", overflowY: "auto" }}>
                            {
                                comments?.map(({ commentId, commentValue, mediaLink, dateCreated, user }: Comment) => {
                                    return <Card border="light" className="bg-dark mt-2" key={commentId}>
                                        <TextContainer>
                                            <AContainer href={`/profile/${user?.userId}`}>
                                            <Row xs={2}>
                                                <Col xs={2}>
                                                <Card.Img src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/images/${user?.imageLink!}`}/>
                                                </Col>
                                                <Col>
                                                <Card.Text>{user?.username}</Card.Text>
                                                </Col>
                                            </Row>
                                            </AContainer>
                                            <Card.Text>{commentValue}</Card.Text>
                                        </TextContainer>
                                    </Card>
                                })
                            }
                            </div>
                            <Form style={{ margin: 'auto', position: "absolute", bottom: "0" }} key={singleGltf?.gltfId} onSubmit={this.handleGltfCommentSubmit}>
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
                    {/* <Modal.Footer>
                    <button className="btn btn-dark" onClick={() => this.handleClose()}>
                        Close
                    </button>
                    <button className="btn btn-dark" >
                        <a style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }} href={`/gltfs/${singleGltf?.gltfId}`}>
                        See File
                        </a>
                    </button>
                    </Modal.Footer> */}
                    </ModalContainer>
                // {/* </Modal> */}
        );
    }

    communityFunction(prop: Community) {
        const { communityName, description, communityId, imageSource, mediaLink  } = prop;
        const { members } = this.props;
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
                        <div >
                        {
                            members.members?.map(({ memberId, user, dateCreated }: Member) => {
                                return (
                                    <Card style={{ verticalAlign: 'middle', justifyContent: 'center', borderRadius: '.3rem', border: 'solid 1px white', color: 'white', backgroundColor: 'black', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer', padding: '.5rem' }} key={memberId}>
                                    <AContainer href={`/profile/${user.userId}`}>
                                    <Row xs={2}>
                                        <Col xs={2}>
                                        <Card.Img style={{ width: '2rem', height: '2rem', objectFit: 'fill' }} src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/images/${user?.imageLink!}`}/>
                                        </Col>
                                        <Col>
                                        <Card.Text>{user.username}</Card.Text>
                                        </Col>
                                    </Row>
                                    </AContainer>
                                    <Card.Text>Joined: {utcConverter(dateCreated)}</Card.Text>
                                    </Card>
                                )
                            })
                        }
                        </div>
                        </CommentContainer>
                        </Col>
                    </Row>
                </Modal.Body>
                {/* <Modal.Footer>
                <button className="btn btn-dark" onClick={() => this.handleClose()}>
                    Close
                </button>
                <a href={`/communities/${communityId}`} style={{ textDecoration: 'none', color: 'white' }} className="btn btn-dark" onClick={() => this.handleClose()}>
                    See Community
                </a>
                </Modal.Footer> */}
            </ModalContainer>
        )
    }

    checkType() {
        const { singlePost, singleChat, singleCommunity, singleGltf } = this.props;
        if (singlePost != undefined) {
            return this.postFunction(singlePost);
        } else if (singleChat != undefined) {
            return this.chatFunction(singleChat);
        } else if (singleCommunity != undefined) {
            return this.communityFunction(singleCommunity);
        } else {
            return this.gltfFunction(singleGltf);
        }
    }

    render() {
        return (
            <>
                {this.checkType()}
            </>
        );
    }
}

export default ModalContent;