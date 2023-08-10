import { ChangeEvent, Component, FormEvent, Fragment } from "react";
import { Badge, Card, Col, Form, Image, Modal, Row } from "react-bootstrap";

import { ArrowsFullscreen, Chat, Rocket, Send } from "react-bootstrap-icons";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { SingleProfileProps } from "../../pages/profile/[id]";
import { CommentState } from "../../store/comment/comment.reducer";
import { GltfState } from "../../store/gltf/gltf.reducer";
import { BadgeContainer, CommentContainer, ModalContainer, PostContainer, TextContainer } from "../../styles/poststab/poststab.styles";
import { Gltf } from "../../store/gltf/gltf.types";

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

export class UserGltfsTab extends Component<any, IDefaultFormFields> {
    constructor(props: any) {
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
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showPreview = this.showPreview.bind(this);
        this.postComment = this.postComment.bind(this);
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


    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }

    handleClick(gltfId: number): void {
        this.props.fetchSingleGltf(gltfId);
        // this.props.getComments(gltfId);
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

    componentDidMount(): void {
        if (this.props.marauderId != undefined) {
            this.props.fetchGltfFiles(this.props.marauderId);
        }
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.marauderId != this.props.marauderId) {
            this.props.fetchGltfFiles(this.props.marauderId);
        }
        //     if (this.props.comments.comments?.length != prevProps.comments.comments?.length) {
        //         this.props.getComments(this.props.gltfs.singleGltf?.gltfId!);
        //         this.setState({
        //             commentValue: ""
        //         })
        //     }
    }

    render() {
        const { gltfs } = this.props;
        const { show } = this.state;
        return (
        <Fragment>
            {
                gltfs.gltfs?.length ?
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 2, 750: 3, 900: 3, 1050: 4}}
                >
                <Masonry>
                {gltfs.gltfs?.map(({ gltfId, fileInformation, userId, shapes }: Gltf, index: number) => {
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
                    <Card.Title>"Currently no files..."</Card.Title>
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
                <a className="btn btn-dark" style={{ textDecoration: 'none', color: 'white' }} href={`/gltfs/${gltfs.singleGltf?.gltfId}`}>
                    See file
                </a>
            </Modal.Footer>
            </ModalContainer>
        </Modal>
        </Fragment>
        );
    }
}

export default UserGltfsTab;