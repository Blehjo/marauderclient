import { ChangeEvent, Dispatch, FormEvent, Fragment, useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import ReactLoading from "react-loading";
import { connect, useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";
import { Send } from "react-bootstrap-icons";
import { chatcommentFetchSingleStart } from "../../store/chatcomment/chatcomment.action";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { GltfFetchAllStart, GltfFetchSingleStart, gltfFetchAllStart, gltfFetchSingleStart } from "../../store/gltf/gltf.action";
import { selectIsGltfLoading, selectSingleGltf } from "../../store/gltf/gltf.selector";
import { CommentCreateStart, GltfCommentFetchSingleStart, commentCreateStart, gltfcommentFetchSingleStart } from "../../store/gltfcomment/gltfcomment.action";
import { selectAllComments, selectIsGltfCommentLoading } from "../../store/gltfcomment/gltfcomment.selector";
import { GltfComment } from "../../store/gltfcomment/gltfcomment.types";
import { RootState } from "../../store/store";
import { CommentBarContainer, CommentContainer, FormContainer, SingleChatContainer, TextContainer } from "../../styles/messages/messages.styles";
import { AContainer } from "../../styles/poststab/poststab.styles";
import { addComment } from "../../utils/api/gltfcomment.api";

interface IModalContent {
    commentValue: string;
    mediaLink: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: File | null;
    show: boolean;
}

const defaultFormFields: IModalContent = {
    commentValue: "",
    mediaLink: "",
    imageSource: "",
    imageFile: null,
    show: false
}

function SingleGltf() {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const gltf = useSelector(selectSingleGltf);
    const comments = useSelector(selectAllComments);
    const gltfLoading = useSelector(selectIsGltfLoading);
    const commentLoading = useSelector(selectIsGltfCommentLoading);
    const router = useRouter();
    const { id } = router.query;
    const gltfId = parseInt(Array.isArray(id) ? id[0] : id!);

    async function postComment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        dispatch(commentCreateStart(formFields.commentValue, formFields.imageFile!, gltfId));
        resetFormFields();
    };

    const resetFormFields = () =>
        setFormFields(defaultFormFields);
 
    const showPreview = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            let imageFile = event.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setFormFields({
                    ...formFields,
                    imageFile,
                    imageSource: x.target?.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setFormFields({
                ...formFields,
                imageFile: null,
                imageSource: null
            })
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    useEffect(() => {
        dispatch(gltfFetchSingleStart(gltfId));
        dispatch(gltfcommentFetchSingleStart(gltfId));
    }, [gltfId]);

    return (
        <Fragment>
            {
                gltfLoading || commentLoading ? 
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <ReactLoading type="bars" color="lightgrey" height={375} width={375}/>
                </div> :
            <>
            <SingleChatContainer>
                <Card className="bg-dark">
                    <Card.Body>
                        <Card.Img src="https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"/>
                        <Row style={{ position: 'relative', color: 'white', marginTop: '1rem' }} xs={3}>
                        <Col xs={1}>
                        <Card.Img style={{ width: '2rem', height: '2rem', objectFit: 'fill' }} src={`http://localhost:8000/images/${gltf?.user.imageLink!}`}/>
                        </Col>
                        <Col>
                        <Card.Text style={{ marginBottom: '.5rem' }}>{gltf?.user.username}</Card.Text>
                        </Col>
                        </Row>
                        <Card.Text style={{ marginBottom: '.5rem', color: 'white' }}>{gltf?.fileInformation}</Card.Text>
                    </Card.Body>
                </Card>
            </SingleChatContainer>
            <CommentBarContainer>
                <CommentContainer>
                    <h1 className="notifications">Comments</h1>
                    {
                        comments?.map(({ gltfCommentId, commentValue, mediaLink, dateCreated, user }: GltfComment) => {
                            return <Card border="light" className="bg-dark mt-2" key={gltfCommentId}>
                                <TextContainer>
                                    <AContainer href={`/profile/${user.userId}`}>
                                    <Row xs={2}>
                                        <Col xs={2}>
                                        <Card.Img src={`http://localhost:8000/images/${user.imageLink!}`}/>
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
                </CommentContainer>
                <FormContainer>
                <Form style={{ margin: 'auto' }} key={gltfId} onSubmit={postComment}>
                    <Row style={{ margin: '.5rem', justifyContent: 'center' }} xs={1}>
                        <Col xs={12}>
                            <Row style={{ marginBottom: '1rem', justifyContent: 'center' }}>
                                <Col xs={12}>
                                    <Form.Group>
                                        <Form.Control style={{ height: '.5rem' }} name="commentValue" as="textarea" onChange={handleChange} placeholder=" Write your comment here" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={{ justifyContent: 'center' }}>
                                <Col xs={9}>
                                    <Form.Group className="mb-3" controlId="formMedia">
                                        <Form.Control onChange={showPreview} name="mediaLink" as="input" accept="image/*" type="file" placeholder="Media" />
                                    </Form.Group>
                                </Col>
                                <Col xs={3}>
                                    <button style={{ textAlign: 'center', width: '100%', height: 'auto'}} className="btn btn-light" type="submit">
                                        <Send/>
                                    </button>
                                </Col>                
                            </Row>
                        </Col>
                    </Row>
                </Form>
                </FormContainer>
            </CommentBarContainer>
            </>
            }
        </Fragment>
    )
}

const mapStateToProps = (state: RootState) => {
    return { 
        gltfs: state.gltf.gltfs,
        singleGltf: state.gltf.singleGltf,
        comments: state.comment.comments
    };
};

const mapDispatchToProps = (dispatch: Dispatch<GltfFetchAllStart | GltfFetchSingleStart  | GltfCommentFetchSingleStart | CommentCreateStart | FavoriteCreateStart>) => ({
	getAll: () => dispatch(gltfFetchAllStart()),
    getFile: (gltfId: number) => dispatch(gltfFetchSingleStart(gltfId)),
    getComments: (gltfId: number) => dispatch(gltfcommentFetchSingleStart(gltfId)),
    createComment: (commentValue: string, imageFile: File, postId: number) => dispatch(commentCreateStart(commentValue, imageFile, postId)),
    likePost: (gltfId: number, contentType: string) => dispatch(favoriteCreateStart(gltfId, contentType))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SingleGltf);