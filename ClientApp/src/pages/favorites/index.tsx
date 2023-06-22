import { Component, Dispatch } from "react";
import ResponsiveMemory from "../../components/responsivememory/responsivememory.component";

import { ConnectedProps, connect } from "react-redux";
import { ChatFetchSingleStart, chatFetchSingleStart } from "../../store/chat/chat.action";
import { ChatCommentFetchSingleStart, chatcommentFetchSingleStart } from "../../store/chatcomment/chatcomment.action";
import { CommentFetchSingleStart, commentFetchSingleStart } from "../../store/comment/comment.action";
import { FavoriteCreateStart, FavoriteFetchUserFavoritesStart, favoriteCreateStart, favoriteFetchUserFavoritesStart } from "../../store/favorite/favorite.action";
import { PostFetchSingleStart, postFetchSingleStart } from "../../store/post/post.action";
import { RootState } from "../../store/store";

type FavoriteProps = ConnectedProps<typeof connector>;

class Favorites extends Component<FavoriteProps> {
    render() {
        return (
            <ResponsiveMemory { ...this.props }/>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        chatcomments: state.chatcomment,
        comments: state.comment,
        favorites: state.favorite.favorites,
        currentUser: state.user.currentUser
    };
};

const mapDispatchToProps = (dispatch: Dispatch<FavoriteCreateStart | FavoriteFetchUserFavoritesStart | CommentFetchSingleStart | ChatFetchSingleStart | ChatCommentFetchSingleStart | PostFetchSingleStart>) => ({
    getChat: (chatId: number) => dispatch(chatFetchSingleStart(chatId)),
    getPost: (postId: number) => dispatch(postFetchSingleStart(postId)),
    getChatComments: (chatId: number) => dispatch(chatcommentFetchSingleStart(chatId)),
    getPostComments: (postId: number) => dispatch(commentFetchSingleStart(postId)),
    getFavorites: () => dispatch(favoriteFetchUserFavoritesStart()),
    likePost: (postId: number, contentType: string) => dispatch(favoriteCreateStart(postId, contentType))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Favorites);