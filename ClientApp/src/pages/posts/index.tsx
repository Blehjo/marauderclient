import { Component, Dispatch } from "react";
import { ConnectedProps, connect } from "react-redux";

import ResponsiveMemory from "../../components/responsivememory/responsivememory.component";
import { CommentCreateStart, CommentFetchSingleStart, commentCreateStart, commentFetchSingleStart } from "../../store/comment/comment.action";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { PostFetchAllStart, PostFetchSingleStart, postFetchAllStart, postFetchSingleStart } from "../../store/post/post.action";
import { RootState } from "../../store/store";

export type PostRouteProps = ConnectedProps<typeof connector>;

class PostRoute extends Component<PostRouteProps> {
    render() {
        return (
            <ResponsiveMemory { ...this.props } />  
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        posts: state.post.posts,
        singlePost: state.post.singlePost,
        comments: state.comment.comments
    };
};

const mapDispatchToProps = (dispatch: Dispatch<PostFetchAllStart | PostFetchSingleStart | CommentFetchSingleStart | CommentCreateStart | FavoriteCreateStart>) => ({
	getAll: () => dispatch(postFetchAllStart()),
    getPost: (postId: number) => dispatch(postFetchSingleStart(postId)),
    getComments: (postId: number) => dispatch(commentFetchSingleStart(postId)),
    createComment: (commentValue: string, imageFile: File, postId: number) => dispatch(commentCreateStart(commentValue, imageFile, postId)),
    likePost: (postId: number, contentType: string) => dispatch(favoriteCreateStart(postId, contentType))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PostRoute);