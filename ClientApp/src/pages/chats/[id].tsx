import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";
import { Send } from "react-bootstrap-icons";
import { chatFetchSingleStart } from "../../store/chat/chat.action";
import { selectIsChatLoading, selectSingleChat } from "../../store/chat/chat.selector";
import { chatcommentFetchSingleStart } from "../../store/chatcomment/chatcomment.action";
import { selectIsChatCommentLoading, selectUserChatcomments } from "../../store/chatcomment/chatcomment.selector";
import { CardContainer, CommentBarContainer, CommentContainer, FormContainer, SingleChatContainer, TextContainer } from "../../styles/messages/messages.styles";
import { utcConverter } from "../../utils/date/date.utils";
import { selectAllComments, selectUserComments } from "../../store/userchatcomment/userchatcomment.selector";
import { commentCreateStart, commentFetchSingleStart } from "../../store/userchatcomment/userchatcomment.action";
import { AContainer } from "../../styles/poststab/poststab.styles";
import { Comment } from "../../store/comment/comment.types";
import { UserChatComment } from "../../store/userchatcomment/userchatcomment.types";
import { addComment } from "../../utils/api/userchatcomment.api";

interface IForm {
    commentValue: string;
    mediaLink: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: File | null;
    show: boolean;
}

const defaultFormFields: IForm = {
    commentValue: "",
    mediaLink: "",
    imageSource: "",
    imageFile: null,
    show: false
}

function SingleChat() {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const chat = useSelector(selectSingleChat);
    const comments = useSelector(selectUserChatcomments);
    const userComments = useSelector(selectAllComments);
    const chatLoading = useSelector(selectIsChatLoading);
    const chatcommentLoading = useSelector(selectIsChatCommentLoading);
    const router = useRouter();
    const { id } = router.query;
    const chatId = parseInt(Array.isArray(id) ? id[0] : id!);

    async function postComment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        dispatch(commentCreateStart(formFields.commentValue, formFields.imageFile!, chatId));
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
        dispatch(chatFetchSingleStart(chatId));
        dispatch(chatcommentFetchSingleStart(chatId));
        dispatch(commentFetchSingleStart(chatId));
    }, [chatId]);

    return (
        <Fragment>
            {
                chatLoading || chatcommentLoading ? 
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
                        <Card.Img style={{ width: '2rem', height: '2rem', objectFit: 'fill' }} src={`https://localhost:7144/images/${chat?.user.imageLink!}`}/>
                        </Col>
                        <Col>
                        <Card.Text style={{ marginBottom: '.5rem' }}>{chat?.user.username}</Card.Text>
                        </Col>
                        <Col>
                        <Card.Text style={{ position: 'absolute', right: '0.5rem' }}>{utcConverter(chat?.dateCreated!)}</Card.Text>
                        </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <div style={{ height: '12rem', overflowY: 'auto' }}>
                {
                    comments?.map(({ chatCommentId, chatValue, mediaLink, dateCreated }) => {
                        return <CardContainer>
                            <Card className="bg-dark" key={chatCommentId}>
                                <TextContainer>
                                    <Card.Text>{chatValue}</Card.Text>
                                    <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                </TextContainer>
                            </Card>
                        </CardContainer>
                    })
                }
                </div>
            </SingleChatContainer>
            <CommentBarContainer>
                <CommentContainer>
                    <h1 className="notifications">Comments</h1>
                    {
                        userComments?.map(({ userChatCommentId, commentValue, mediaLink, dateCreated, user }: UserChatComment) => {
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
                </CommentContainer>
                <FormContainer>
                <Form style={{ margin: 'auto' }} key={chat?.chatId} onSubmit={postComment}>
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

export default SingleChat;