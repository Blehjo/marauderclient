import { Component, Dispatch } from "react";
import { ConnectedProps, connect } from "react-redux";

import ResponsiveMemory from "../../components/responsivememory/responsivememory.component";

import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { PostFetchAllStart, PostFetchSingleStart, postFetchAllStart, postFetchSingleStart } from "../../store/post/post.action";
import { RootState } from "../../store/store";
import { GltfFetchAllStart, GltfFetchSingleStart, gltfFetchAllStart, gltfFetchSingleStart } from "../../store/gltf/gltf.action";
import { CommentCreateStart, GltfCommentFetchSingleStart, commentCreateStart, gltfcommentFetchSingleStart } from "../../store/gltfcomment/gltfcomment.action";

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
        comments: state.gltfcomment.comments
    };
};

const mapDispatchToProps = (dispatch: Dispatch<GltfFetchAllStart | GltfFetchSingleStart | GltfCommentFetchSingleStart| PostFetchAllStart | PostFetchSingleStart | GltfCommentFetchSingleStart | CommentCreateStart | FavoriteCreateStart>) => ({
	getAll: () => dispatch(gltfFetchAllStart()),
    getFile: (gltfId: number) => dispatch(gltfFetchSingleStart(gltfId)),
    getComments: (gltfId: number) => dispatch(gltfcommentFetchSingleStart(gltfId)),
    createGltfComment: (commentValue: string, imageFile: File, gltfId: number) => dispatch(commentCreateStart(commentValue, imageFile, gltfId)),
    likePost: (gltfId: number, contentType: string) => dispatch(favoriteCreateStart(gltfId, contentType))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(GltfRoute);