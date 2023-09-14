import { ChangeEvent, Component, Dispatch, FormEvent, ReactNode } from "react";
import { ConnectedProps, connect } from "react-redux";

import { CommentCreateStart, CommentFetchSingleStart, commentCreateStart, commentFetchSingleStart } from "../../store/comment/comment.action";
import { RootState } from "../../store/store";

import { Card, Col, Form, Row } from "react-bootstrap";
import { utcConverter } from "../../utils/date/date.utils";
import { Post } from "../../store/post/post.types";
import { Send } from "react-bootstrap-icons";
import { CardContainer, CommentBarContainer, CommentContainer, FormContainer, TextCommentContainer, TextContainer } from "../../styles/messages/messages.styles";
import { getSingleMarauder } from "../../utils/api/user.api";
import { Marauder } from "../../store/marauder/marauder.types";
import { AContainer } from "../../styles/poststab/poststab.styles";

interface CommentQuery extends CommentProps {
    queryId: number;
    post: Post;
    user: Marauder;
    getUser: (userId: string) => void;
}

type CommentProps = ConnectedProps<typeof connector>;

interface IDefaultFormFields {
    commentValue: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    show: boolean;
}

class UserInfo extends Component {
    state: {
        username: string
    };
    constructor(properties: {username: string}) {
        super(properties)
        this.state = properties;
    }
}

export class Comment extends Component<CommentQuery, IDefaultFormFields> {
    constructor(props: CommentQuery) {
        super(props);
        this.state = {
            commentValue: "",
            imageSource: "",
            imageFile: null,
            show: false
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showPreview = this.showPreview.bind(this);
        this.postComment = this.postComment.bind(this);
    }

    postComment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { commentValue, imageFile } = this.state;
        const { posts } = this.props;
        const postId = posts.singlePost?.postId ? posts.singlePost.postId : 0
        this.props.createComment(commentValue, imageFile, postId);
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }

    handleClick(): void {
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
        const { queryId } = this.props;
        if (queryId != null) {
            this.props.getComments(queryId);
        }
    }
    
    componentDidUpdate(prevProps: Readonly<CommentQuery>, prevState: Readonly<IDefaultFormFields>, snapshot?: any): void {
        if (this.props.comments.comments?.length !== prevProps.comments.comments?.length) {
            this.props.getComments(this.props.posts.singlePost?.postId!)
        }
        if (prevProps.queryId != this.props.queryId) {
            const { queryId } = this.props;
            if (queryId != null) {
                this.props.getComments(this.props.queryId);
            }
        }
    }

    render() {
        const { post, comments } = this.props;
        return(
            <CommentBarContainer>
                <CommentContainer>
                    <h1 className="notifications">Comments</h1>
                {
                    comments.comments?.map(({ commentId, commentValue, mediaLink, dateCreated, user }) => {
                        return <CardContainer>
                            <Card className="bg-dark" key={commentId}>
                                <TextCommentContainer>
                                    <AContainer href={`/profile/${user.userId}`}>
                                    <Row xs={2}>
                                        <Col xs={2}>
                                        <Card.Img src={`https://localhost:7144/images/${user.imageLink!}`}/>
                                        </Col>
                                        <Col>
                                        <Card.Text style={{ marginBottom: '.5rem' }}>{user.username}</Card.Text>
                                        </Col>
                                    </Row>
                                    </AContainer>
                                    <Card.Text>{commentValue}</Card.Text>
                                </TextCommentContainer>
                            </Card>
                        </CardContainer>
                    })
                }
                </CommentContainer>
                <FormContainer>
                <Form style={{ margin: 'auto' }} key={post?.postId} onSubmit={this.postComment}>
                    <Row style={{ margin: '.5rem', justifyContent: 'center' }} xs={1}>
                        <Col xs={12}>
                            <Row style={{ marginBottom: '1rem', justifyContent: 'center' }}>
                                <Col xs={12}>
                                    <Form.Group>
                                        <Form.Control style={{ height: '.5rem' }} name="commentValue" as="textarea" onChange={this.handleChange} placeholder=" Write your comment here" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={{ justifyContent: 'center' }}>
                                <Col xs={9}>
                                    <Form.Group className="mb-3" controlId="formMedia">
                                        <Form.Control onChange={this.showPreview} name="mediaLink" as="input" accept="image/*" type="file" placeholder="Media" />
                                    </Form.Group>
                                </Col>
                                <Col xs={3}>
                                    <button id={post?.postId.toString()} style={{ textAlign: 'center', width: '100%', height: 'auto'}} className="btn btn-light" type="submit">
                                        <Send/>
                                    </button>
                                </Col>                
                            </Row>
                        </Col>
                    </Row>
                </Form>
                </FormContainer>
            </CommentBarContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        posts: state.post,
        comments: state.comment 
    };
};

const mapDispatchToProps = (dispatch: Dispatch<CommentFetchSingleStart | CommentCreateStart >) => ({
    getComments: (postId: number) => dispatch(commentFetchSingleStart(postId)),
    createComment: (commentValue: string, imageFile: File, postId: number) => dispatch(commentCreateStart(commentValue, imageFile, postId)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Comment);