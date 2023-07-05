import { Component, Dispatch } from "react";
import { ConnectedProps, connect } from "react-redux";
import ResponsiveMemory from "../../components/responsivememory/responsivememory.component";

import { MessageCreateStart, MessageSetID, messageCreateStart, messageSetId } from "../../store/message/message.action";
import { MessageCommentCreateStart, messagecommentCreateStart } from "../../store/messagecomment/messagecomment.action";
import { RootState } from "../../store/store";
import { MarauderFetchAllStart, MarauderFetchSingleStart, marauderFetchAllStart, marauderFetchSingleStart } from "../../store/marauder/marauder.action";
import { Marauder } from "../../store/marauder/marauder.types";
import { MessageState } from "../../store/message/message.reducer";

type MarauderProps = ConnectedProps<typeof connector>;

class Marauders extends Component<MarauderProps> {
    render() {
        const { marauders } = this.props;
        return (
            <ResponsiveMemory profiles={marauders} { ...this.props }/>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        marauders: state.marauder.marauders,
        messages: state.message
    };
};

const mapDispatchToProps = (dispatch: Dispatch<MarauderFetchAllStart | MessageSetID | MarauderFetchSingleStart | MessageCreateStart | MessageCommentCreateStart>) => ({
	getAll: () => dispatch(marauderFetchAllStart()),
    getMarauder: (userId: number ) => dispatch(marauderFetchSingleStart(userId)),
    sendMessage: (messageValue: string) => dispatch(messageCreateStart(messageValue)),
    createMessageComment: (messageId: number, messageValue: string, mediaLink: File) => dispatch(messagecommentCreateStart(messageId, messageValue, mediaLink)),
    setId: (messageId: number) => dispatch(messageSetId(messageId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Marauders);