import { Fragment, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { selectSinglePost } from "../../store/post/post.selector";
import { postFetchSingleStart } from "../../store/post/post.action";
import CommentsComponent from "../../components/comment/comments.component";
import { SinglePostContainer } from "../../styles/messages/messages.styles";
import { marauderFetchSingleStart } from "../../store/marauder/marauder.action";
import { selectSingleMarauder } from "../../store/marauder/marauder.selector";

const defaultFormFields = {
    commentValue: '',
    mediaLink: '',
    imageSource: null,
    imageFile: null
}

function SinglePost() {
    const dispatch = useDispatch();
    const user = useSelector(selectSingleMarauder);
    const post = useSelector(selectSinglePost);
    const router = useRouter();
    const { id } = router.query!;
    const postId = parseInt(Array.isArray(id) ? id[0] : id!);

    function getUser(userId: string) {
        dispatch(marauderFetchSingleStart(userId));
    }

    useEffect(() => {
        dispatch(postFetchSingleStart(postId));
    }, [id]);
    
    return (
        <Fragment>
            <SinglePostContainer>
                <Card className="bg-dark">
                    <Card.Body>
                        <Card.Img src={post?.mediaLink != null ? post?.imageSource : "https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"}/>
                    </Card.Body>
                    <Card.Footer>
                    <div style={{  height: '5rem', color: 'white' }}>
                        <Row style={{ paddingBottom: '1rem' }} xs={2}>
                        <Col xs={1}>
                        <Card.Img style={{ width: '2rem', height: '2rem' }} src={`https://localhost:7144/images/${post?.user.imageLink!}`}/>
                        </Col>
                        <Col>
                        <Card.Text>{post?.user.username}</Card.Text>
                        </Col>
                        </Row>
                        {post?.postValue}
                    </div>
                    </Card.Footer>
                </Card>
            </SinglePostContainer>
            <CommentsComponent user={user!} getUser={getUser} post={post!} queryId={postId}/>
        </Fragment>
    )
}

export default SinglePost;