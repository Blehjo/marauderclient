import { Component, Dispatch } from "react";
import { ConnectedProps, connect } from "react-redux";

import { ChatFetchAllStart, ChatFetchSingleStart, chatFetchAllStart, chatFetchSingleStart } from "../../store/chat/chat.action";
import { ChatCommentCreateStart, ChatCommentFetchSingleStart, chatcommentCreateStart, chatcommentFetchSingleStart } from "../../store/chatcomment/chatcomment.action";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { RootState } from "../../store/store";
import { ChatContainer } from "../../styles/chat.styles";
import ResponsiveMemory from "../../components/responsivememory/responsivememory.component";

export type ChatRouteProps = ConnectedProps<typeof connector>;

const chatcontent = [
    {
    "chatId": 1,
    "title": "Has there ever been a painting in space?",
    "type": "chat",
    "dateCreated": "2023-06-13T05:39:51.1712187",
    "userId": 2,
    "user": {
    "userId": 2,
    "username": "ellesse`",
    "firstName": "Eleven",
    "lastName": "Major",
    "dateOfBirth": "0001-01-01T00:00:00",
    "emailAddress": "ellesse",
    "password": "$2a$11$QQ4daHAQ96WCOvC0mS7zmeYHKUYYCCIqIWFX6STgpGNk40qGWDRji",
    "about": "Marauder of Dunes",
    "imageLink": "pioneers-p233748117.jpg",
    "imageFile": null,
    "imageSource": null,
    "dateCreated": "2023-06-13T05:37:48.4225121",
    "planets": null,
    "posts": null,
    "moons": null,
    "followers": null,
    "favorites": null
    },
    "artificialId": 1,
    "artificialIntelligence": null,
    "chatComments": [
    {
    "chatCommentId": 1,
    "chatValue": "Has there ever been a painting in space?",
    "mediaLink": null,
    "type": "ChatComment",
    "imageFile": null,
    "imageSource": null,
    "dateCreated": "2023-06-13T05:39:53.6748754",
    "chatId": 1,
    "chat": null,
    "favorites": null
    },
    {
    "chatCommentId": 2,
    "chatValue": "No, there has never been a painting created in space. While art has been taken on space missions and created by astronauts, it has been done on paper or using other materials that are compatible with the space environment. The lack of gravity, extreme temperatures, and limited resources make it challenging to create traditional paintings in space. However, there have been experiments to test the feasibility of painting in space by using different techniques and materials.",
    "mediaLink": null,
    "type": "ChatComment",
    "imageFile": null,
    "imageSource": null,
    "dateCreated": "2023-06-13T05:39:58.5490021",
    "chatId": 1,
    "chat": null,
    "favorites": null
    }
    ],
    "comments": [],
    "favorites": []
    },
    {
    "chatId": 2,
    "title": "What celestial body other than earth is most likely to have life?",
    "type": "chat",
    "dateCreated": "2023-06-13T05:41:34.3879893",
    "userId": 2,
    "user": {
    "userId": 2,
    "username": "ellesse`",
    "firstName": "Eleven",
    "lastName": "Major",
    "dateOfBirth": "0001-01-01T00:00:00",
    "emailAddress": "ellesse",
    "password": "$2a$11$QQ4daHAQ96WCOvC0mS7zmeYHKUYYCCIqIWFX6STgpGNk40qGWDRji",
    "about": "Marauder of Dunes",
    "imageLink": "pioneers-p233748117.jpg",
    "imageFile": null,
    "imageSource": null,
    "dateCreated": "2023-06-13T05:37:48.4225121",
    "planets": null,
    "posts": null,
    "moons": null,
    "followers": null,
    "favorites": null
    },
    "artificialId": 2,
    "artificialIntelligence": null,
    "chatComments": [
    {
    "chatCommentId": 3,
    "chatValue": "What celestial body other than earth is most likely to have life?",
    "mediaLink": null,
    "type": "ChatComment",
    "imageFile": null,
    "imageSource": null,
    "dateCreated": "2023-06-13T05:41:36.0354607",
    "chatId": 2,
    "chat": null,
    "favorites": null
    },
    {
    "chatCommentId": 4,
    "chatValue": "As an AI language model, I cannot provide a definitive answer to this question as it is still a matter of scientific debate and research. However, based on current knowledge, some of the most promising candidates for potential extraterrestrial life in our solar system are Jupiter's moon Europa, Saturn's moon Enceladus, and Mars. In addition, there is ongoing research on exoplanets (planets outside our solar system) located in potentially habitable zones of their host stars that may have the necessary conditions for supporting life.",
    "mediaLink": null,
    "type": "ChatComment",
    "imageFile": null,
    "imageSource": null,
    "dateCreated": "2023-06-13T05:41:41.6952379",
    "chatId": 2,
    "chat": null,
    "favorites": null
    }
    ],
    "comments": [],
    "favorites": []
    },
    {
    "chatId": 3,
    "title": "How long would it take to reach Jupiter?",
    "type": "chat",
    "dateCreated": "2023-06-13T05:42:17.4287099",
    "userId": 2,
    "user": {
    "userId": 2,
    "username": "ellesse`",
    "firstName": "Eleven",
    "lastName": "Major",
    "dateOfBirth": "0001-01-01T00:00:00",
    "emailAddress": "ellesse",
    "password": "$2a$11$QQ4daHAQ96WCOvC0mS7zmeYHKUYYCCIqIWFX6STgpGNk40qGWDRji",
    "about": "Marauder of Dunes",
    "imageLink": "pioneers-p233748117.jpg",
    "imageFile": null,
    "imageSource": null,
    "dateCreated": "2023-06-13T05:37:48.4225121",
    "planets": null,
    "posts": null,
    "moons": null,
    "followers": null,
    "favorites": null
    },
    "artificialId": 2,
    "artificialIntelligence": null,
    "chatComments": [
    {
    "chatCommentId": 5,
    "chatValue": "How long would it take to reach Jupiter?",
    "mediaLink": "null",
    "type": "ChatComment",
    "imageFile": null,
    "imageSource": null,
    "dateCreated": "2023-06-13T05:42:17.5109116",
    "chatId": 3,
    "chat": null,
    "favorites": null
    },
    {
    "chatCommentId": 6,
    "chatValue": "As an AI language model, I don't have a concrete identity that allows me to track time or calculate distances, but I can provide you with the following information: \r\n\r\nThe duration of the journey to Jupiter would depend on various factors such as the position of Jupiter in its orbit and the spacecraft used for the trip. On average, it takes about 6 to 7 months for a spacecraft to travel to Jupiter from Earth. The distance from Earth to Jupiter varies depending on the positions of the planets. At its closest approach, Jupiter is approximately 365 million miles (588 million kilometers) away from Earth. At its furthest, the distance can be as much as 601 million miles (968 million kilometers).",
    "mediaLink": "null",
    "type": "ChatComment",
    "imageFile": null,
    "imageSource": null,
    "dateCreated": "2023-06-13T05:42:24.8018497",
    "chatId": 3,
    "chat": null,
    "favorites": null
    }
    ],
    "comments": [],
    "favorites": []
    },
    {
    "chatId": 4,
    "title": "How far is the moon from earth in miles?",
    "type": "chat",
    "dateCreated": "2023-06-13T05:45:47.9034538",
    "userId": 2,
    "user": {
    "userId": 2,
    "username": "ellesse`",
    "firstName": "Eleven",
    "lastName": "Major",
    "dateOfBirth": "0001-01-01T00:00:00",
    "emailAddress": "ellesse",
    "password": "$2a$11$QQ4daHAQ96WCOvC0mS7zmeYHKUYYCCIqIWFX6STgpGNk40qGWDRji",
    "about": "Marauder of Dunes",
    "imageLink": "pioneers-p233748117.jpg",
    "imageFile": null,
    "imageSource": null,
    "dateCreated": "2023-06-13T05:37:48.4225121",
    "planets": null,
    "posts": null,
    "moons": null,
    "followers": null,
    "favorites": null
    },
    "artificialId": 1,
    "artificialIntelligence": null,
    "chatComments": [
    {
    "chatCommentId": 7,
    "chatValue": "How far is the moon from earth in miles?",
    "mediaLink": "null",
    "type": "ChatComment",
    "imageFile": null,
    "imageSource": null,
    "dateCreated": "2023-06-13T05:45:48.0116476",
    "chatId": 4,
    "chat": null,
    "favorites": null
    },
    {
    "chatCommentId": 8,
    "chatValue": "The moon is approximately 238,855 miles away from Earth.",
    "mediaLink": "null",
    "type": "ChatComment",
    "imageFile": null,
    "imageSource": null,
    "dateCreated": "2023-06-13T05:45:49.2981313",
    "chatId": 4,
    "chat": null,
    "favorites": null
    }
    ],
    "comments": [],
    "favorites": []
    }
]

class ChatRoute extends Component<ChatRouteProps> {
    render() {
        return (
            <ChatContainer>
                <ResponsiveMemory { ...this.props } />
            </ChatContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        chats: chatcontent,
        chatComments: state.chatcomment
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ChatFetchAllStart | ChatFetchSingleStart | ChatCommentFetchSingleStart | FavoriteCreateStart | ChatCommentCreateStart>) => ({
	getAllChats: () => dispatch(chatFetchAllStart()),
    getChat: (chatId: number) => dispatch(chatFetchSingleStart(chatId)),
    getComments: (chatId: number) => dispatch(chatcommentFetchSingleStart(chatId)),
    createComment: (chatId: number, commentValue: string, imageFile: File) => dispatch(chatcommentCreateStart(chatId, commentValue, imageFile)),
    likePost: (postId: number, contentType: string) => dispatch(favoriteCreateStart(postId, contentType))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ChatRoute);