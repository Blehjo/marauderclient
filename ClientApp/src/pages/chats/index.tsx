import { Component, Dispatch } from "react";
import { ConnectedProps, connect } from "react-redux";

import { ChatFetchAllStart, ChatFetchSingleStart, chatFetchAllStart, chatFetchSingleStart } from "../../store/chat/chat.action";
import { ChatCommentCreateStart, ChatCommentFetchSingleStart, chatcommentCreateStart, chatcommentFetchSingleStart } from "../../store/chatcomment/chatcomment.action";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { RootState } from "../../store/store";
import ResponsiveMemory from "../../components/responsivememory/responsivememory.component";
import { CommentCreateStart, CommentFetchSingleStart, commentCreateStart, commentFetchSingleStart } from "../../store/userchatcomment/userchatcomment.action";

export type ChatRouteProps = ConnectedProps<typeof connector>;

class ChatRoute extends Component<ChatRouteProps> {
    render() {
        return (
            <ResponsiveMemory { ...this.props } />
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        chats: state.chat.chats,
        singleChat: state.chat.singleChat,
        comments: state.chatcomment.userChatcomments,
        userchatcomments: state.userchatcomment.comments
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ChatFetchAllStart | ChatFetchSingleStart | CommentFetchSingleStart | ChatCommentFetchSingleStart | CommentCreateStart | FavoriteCreateStart | ChatCommentCreateStart>) => ({
	getAll: () => dispatch(chatFetchAllStart()),
    getChat: (chatId: number) => dispatch(chatFetchSingleStart(chatId)),
    getComments: (chatId: number) => dispatch(chatcommentFetchSingleStart(chatId)),
    getUserComments: (chatId: number) => dispatch(commentFetchSingleStart(chatId)),
    createComment: (chatId: number, commentValue: string, imageFile: File) => dispatch(chatcommentCreateStart(chatId, commentValue, imageFile)),
    createUserComment: (commentValue: string, imageFile: File, chatId: number ) => dispatch(commentCreateStart(commentValue, imageFile, chatId)),
    likePost: (postId: number, contentType: string) => dispatch(favoriteCreateStart(postId, contentType))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ChatRoute);