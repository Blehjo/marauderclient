import { ChangeEvent, Component, FormEvent, Fragment } from "react";
import { Badge, Card, Col, Form, Image, Modal, Row } from "react-bootstrap";

import { ArrowsFullscreen, Chat, Rocket, Send, XCircle } from "react-bootstrap-icons";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { ProfileProps } from "../../pages/profile";
import { CommentState } from "../../store/comment/comment.reducer";
import { GltfState } from "../../store/gltf/gltf.reducer";
import { BadgeContainer, CommentContainer, ModalContainer, ModalPostContainer, PostContainer, TextContainer } from "../../styles/poststab/poststab.styles";
import { XContainer } from "../../styles/devices/devices.styles";

interface IDefaultFormFields {
    commentValue: string;
    fileInformation: string;
    mediaLink: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    show: boolean;
    showCreate: boolean;
    showDelete: boolean;
    gltfId: number | null;
};

export class GltfsTab extends Component<ProfileProps, IDefaultFormFields> {
    constructor(props: ProfileProps) {
        super(props);
        this.state = {
            fileInformation: "",
            mediaLink: "",
            imageSource: "",
            imageFile: null,
            show: false,
            showCreate: false,
            showDelete: false,
            commentValue: "",
            gltfId: null
        }

        this.handleLike = this.handleLike.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseCreate = this.handleCloseCreate.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showPreview = this.showPreview.bind(this);
        this.postComment = this.postComment.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    postComment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { commentValue, imageFile } = this.state;
        const { gltfs } = this.props;
        const gltfId = gltfs.singleGltf?.gltfId ? gltfs.singleGltf.gltfId : 0
        try {
            this.props.createComment(commentValue, imageFile, gltfId);
        } catch (error) {
            return error;
        }
    }

    handleLike(gltfId: number, type: string): void {
        this.props.likePost(gltfId, type);
    }

    handleCreate(): void {
        this.setState({
            showCreate: !this.state.showCreate
        })
    }

    handleDelete(): void {
        this.props.deletePost(this.state.gltfId!);
        this.handleCloseDelete();
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }
    
    handleCloseCreate(): void {
        this.setState({
            showCreate: !this.state.showCreate
        });
    }
    
    handleCloseDelete(): void {
        this.setState({
            showDelete: !this.state.showDelete
        });
    }

    handleDeleteClick(gltfId: number): void {
        this.setState({
            gltfId: gltfId
        })
        this.handleCloseDelete();
    }

    handleClick(gltfId: number): void {
        this.props.fetchSingleGltf(gltfId);
        // this.props.getComments(gltfId);
        this.setState({
            show: !this.state.show
        });
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { fileInformation } = this.state;
        try {
            this.props.createGltfFile(fileInformation);
        } catch (error) {
            if (error) {
                alert('Try again, please');
            } 
        }
        this.handleCloseCreate();
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

    componentDidMount(): void {
        this.props.fetchGltfFiles();
    }

    componentDidUpdate(prevProps: Readonly<{ comments: CommentState; gltfs: GltfState} & { getComments: (gltfId: number) => void; }>, prevState: Readonly<IDefaultFormFields>, snapshot?: any): void {
        if (this.props.gltfs.gltfs?.length != prevProps.gltfs.gltfs?.length) {
            this.props.fetchGltfFiles();
            this.setState({
                fileInformation: ""
            })
        }

        if (this.props.gltfs.singleGltf?.gltfId != prevProps.gltfs.singleGltf?.gltfId) {
            this.props.fetchGltfFiles();
            this.setState({
                commentValue: ""
            })
        }

        if (this.props.comments.comments?.length != prevProps.comments.comments?.length) {
            this.props.getComments(this.props.gltfs.singleGltf?.gltfId!);
            this.setState({
                commentValue: ""
            })
        }
    }

    render() {
        const { currentUser, userprofile, gltfs } = this.props;
        const { show, showCreate, showDelete, fileInformation } = this.state;
        return (
        <Fragment>
            <Row style={{ marginBottom: '2rem' }} xs={1} >
                <Col>
                    <Card style={{ color: 'white', textAlign: 'center', background: 'black', border: '1px solid white' }}>
                        <Card.Body>
                            <Card.Title style={{ cursor: 'pointer' }} onClick={this.handleCreate} >Create a file</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {
                gltfs.gltfs?.length ?
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 2, 750: 3, 900: 3, 1050: 4}}
                >
                <Masonry>
                {gltfs.gltfs?.map(({ gltfId, fileInformation, userId, shapes }, index) => {
                    return <PostContainer key={index}>
                        <Card key={gltfId} style={{ background: 'black', border: 'solid 1px white', padding: '.5rem', margin: '.3rem', color: 'white'}}>
                            <Card.Img src="https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"/>
                            <Card.ImgOverlay>
                                <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                                    <BadgeContainer>
                                        <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} onClick={() => this.handleClick(gltfId!)} size={15} /></Badge>
                                    </BadgeContainer>
                                    {
                                        <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                            <Chat size={15}/>
                                            {/* {` ${comments?.length > 0 ? comments?.length : ""}`} */}
                                            </Badge>
                                        </BadgeContainer>
                                    }
                                    {
                                        <BadgeContainer>
                                            <Badge style={{ color: 'black' }} bg="light">
                                            <Rocket style={{ cursor: 'pointer' }} /* onClick={() => this.handleLike(gltfId, type)} size={15} */ />
                                            {/* {` ${favorites?.length > 0 ? favorites?.length : ""}`} */}
                                            </Badge>
                                        </BadgeContainer>
                                    }
                                </div>
                                <Col xs={3}>
                                    <XContainer>
                                        <XCircle onClick={() => this.handleDeleteClick(gltfId!)} key={gltfId} style={{ borderRadius: ".5rem", cursor: "pointer", position: "absolute", right: "5", top: "5" }}/>
                                    </XContainer>
                                </Col>
                            </Card.ImgOverlay>
                            <Card.Body>
                                <Card.Text>{fileInformation}</Card.Text>
                            </Card.Body>
                        </Card>
                    </PostContainer>
                })}
                </Masonry>
            </ResponsiveMasonry> : 
            <Col xs={12}>
                <Card style={{ padding: '.5rem', color: 'white', textAlign: 'center', background: 'black', border: '1px solid white' }}>
                    <Card.Title>"Currently no files... Let's change that!"</Card.Title>
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
                <Modal.Title >Marauder Log</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={8}>
                    <Image
                        fluid
                        style={{ borderRadius: '.2rem', objectFit: 'cover', width: '30rem', height: '30rem' }}
                        src="https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"
                    />
                    <Card style={{ marginTop: "1rem" }} className="bg-dark" key={gltfs.singleGltf?.gltfId}>
                        <TextContainer style={{ color: 'white' }}>
                            {gltfs.singleGltf?.fileInformation}
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
                        <Form style={{ margin: 'auto', position: "absolute", bottom: "0" }} key={gltfs.singleGltf?.gltfId} onSubmit={this.postComment}>
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
                <a className="btn btn-dark" style={{ textDecoration: 'none', color: 'white' }} href={`/singleGltf/${gltfs.singleGltf?.gltfId}`}>
                    Single View
                </a>
            </Modal.Footer>
            </ModalContainer>
        </Modal>
        <Modal show={showCreate} onHide={() => this.handleCloseCreate()}>
            <ModalPostContainer>
            <Modal.Header closeButton>
            <Modal.Title>Data Log</Modal.Title>
            </Modal.Header>
            <Form autoComplete="off" onSubmit={this.handleSubmit}>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formPostValue">
                <Form.Control
                    onChange={this.handleChange}
                    name="fileInformation"
                    value={fileInformation}
                    type="fileInformation"
                    as="input"
                    placeholder="File Name"
                    autoFocus
                    />
                </Form.Group>
                <Form.Group
                className="mb-3"
                controlId="formFile"
                >
                <Form.Control 
                    as="input"
                    name="mediaLink"
                    onChange={this.showPreview}
                    accept="image/*"
                    type="file" 
                    placeholder="Media"
                />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <button type="submit" className="btn btn-primary">
                Log
            </button>
            </Modal.Footer>
            </Form>
            </ModalPostContainer>
        </Modal>
        <Modal show={showDelete} onHide={() => this.handleCloseDelete()}>
            <Modal.Body style={{ textAlign: "center", color: "black" }}>
                Are you sure you want to delete this file?
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: "center" }}>
            <button className="btn btn-secondary" onClick={() => this.handleCloseDelete()}>
                Cancel
            </button>
            <button onClick={() => this.handleDelete()} className="btn btn-primary">
                Delete
            </button>
            </Modal.Footer>
        </Modal>
        </Fragment>
        );
    }
}

export default GltfsTab;