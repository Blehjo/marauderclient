import { Fragment, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { selectSinglePost } from "../../store/post/post.selector";
import { postFetchSingleStart } from "../../store/post/post.action";
import CommentsComponent from "../../components/comment/comments.component";
import { SinglePostContainer } from "../../styles/messages/messages.styles";

const defaultFormFields = {
    commentValue: '',
    mediaLink: '',
    imageSource: null,
    imageFile: null
}

function SinglePost() {
    const dispatch = useDispatch();
    const post = useSelector(selectSinglePost);
    const router = useRouter();
    const { id } = router.query;
    const postId = parseInt(id);

    useEffect(() => {
        dispatch(postFetchSingleStart(postId));
    }, [id]);
    
    return (
        <Fragment>
            <SinglePostContainer>
                <Card className="bg-dark">
                    <Card.Body>
                        <Card.Img src={post?.imageSource}/>
                    </Card.Body>
                    <Card.Footer>
                    <div style={{ height: '5rem', overflowY: 'auto' }}>
                        {post?.postValue}
                    </div>
                    </Card.Footer>
                </Card>
            </SinglePostContainer>
            <CommentsComponent post={post!} queryId={postId}/>
        </Fragment>
    )
}

export default SinglePost;