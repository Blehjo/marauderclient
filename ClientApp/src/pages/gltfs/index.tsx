import { Component, Dispatch } from "react";
import { ConnectedProps, connect } from "react-redux";

import ResponsiveMemory from "../../components/responsivememory/responsivememory.component";
import { CommentCreateStart, CommentFetchSingleStart, commentCreateStart, commentFetchSingleStart } from "../../store/comment/comment.action";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { PostFetchAllStart, PostFetchSingleStart, postFetchAllStart, postFetchSingleStart } from "../../store/post/post.action";
import { RootState } from "../../store/store";
import { GltfFetchAllStart, GltfFetchSingleStart, gltfFetchAllStart, gltfFetchSingleStart } from "../../store/gltf/gltf.action";

export type GltfRouteProps = ConnectedProps<typeof connector>;

class GltfRoute extends Component<GltfRouteProps> {
    render() {
        return (
            <ResponsiveMemory { ...this.props } />  
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        gltfs: state.gltf.gltfs,
        singleGltf: state.gltf.singleGltf,
        comments: state.comment.comments
    };
};

const mapDispatchToProps = (dispatch: Dispatch<GltfFetchAllStart | GltfFetchSingleStart | PostFetchAllStart | PostFetchSingleStart | CommentFetchSingleStart | CommentCreateStart | FavoriteCreateStart>) => ({
	getAll: () => dispatch(gltfFetchAllStart()),
    getFile: (gltfId: number) => dispatch(gltfFetchSingleStart(gltfId)),
    getComments: (gltfId: number) => dispatch(commentFetchSingleStart(gltfId)),
    createComment: (commentValue: string, imageFile: File, postId: number) => dispatch(commentCreateStart(commentValue, imageFile, postId)),
    likePost: (gltfId: number, contentType: string) => dispatch(favoriteCreateStart(gltfId, contentType))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(GltfRoute);