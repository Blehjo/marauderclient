import { ChangeEvent, Component } from "react";
import { Card, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { Send } from "react-bootstrap-icons";
import { CommentContainer, ModalContainer, TextContainer } from "../../styles/modal/modal.styles";

class ModalContent extends Component<any> {
    
    state = {
        show: this.props.show
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
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

    chatFunction(prop: any) {
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
                            <Card style={{ marginTop: "1rem" }} className="bg-dark" key={chatId}>
                            <TextContainer>
                            {title}
                            </TextContainer>
                        </Card>
                        </Col>
                        <Col>
                        <CommentContainer>
                        <div>Comments</div>
                        <div style={{ height: "65%", overflowY: "auto" }}>
                        {/* {
                            chatComments.userChatcomments?.map(({ chatCommentId, chatValue, mediaLink, dateCreated }) => {
                                return <CardContainer>
                                    <Card className="bg-dark" key={chatCommentId}>
                                        <TextContainer>
                                            <Card.Text>{chatValue}</Card.Text>
                                            <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                        </TextContainer>
                                    </Card>
                                </CardContainer>
                            })
                        } */}
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

    postFunction(prop: any) {
        const { postId, postValue, mediaLink, comments, favorites, type, imageSource } = prop;
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
                            <Card style={{ marginTop: "1rem" }} className="bg-dark" key={postId}>
                                <TextContainer>
                                {postValue}
                                </TextContainer>
                            </Card>
                            </Col>
                            <Col>
                            <CommentContainer>
                            <div>Comments</div>
                            <div style={{ height: "65%", overflowY: "auto" }}>
                            {/* {
                                comments.comments?.map(({ commentId, commentValue, mediaLink, dateCreated }) => {
                                    return <CardContainer>
                                        <Card className="bg-dark" key={commentId}>
                                            <TextContainer>
                                                <Card.Text>{commentValue}</Card.Text>
                                                <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                            </TextContainer>
                                        </Card>
                                    </CardContainer>
                                })
                            } */}
                            </div>
                            <Form style={{ margin: 'auto', position: "absolute", bottom: "0" }} key={postId} onSubmit={this.props.postComment}>
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

    checkType() {
        const { posts, chats, profiles } = this.props;
        if (posts != undefined) {
            return this.postFunction(posts)
        } else if (chats != undefined) {
            return this.chatFunction(chats)
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