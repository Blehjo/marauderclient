import { all, call } from 'typed-redux-saga/macro';

import { artificialIntelligenceSagas } from './artificialintelligence/artificialintelligence.saga';
import { moonCommentSagas } from './channel/channel.saga';
import { planetcommentSagas } from './channelcomment/channelcomment.saga';
import { chatSagas } from './chat/chat.saga';
import { chatCommentSagas } from './chatcomment/chatcomment.saga';
import { commentSagas } from './comment/comment.saga';
import { planetSagas } from './community/community.saga';
import { favoriteSagas } from './favorite/favorite.saga';
import { followerSagas } from './follower/follower.saga';
import { marauderSagas } from './marauder/marauder.saga';
import { moonSagas } from './member/member.saga';
import { messageSagas } from './message/message.saga';
import { messageCommentSagas } from './messagecomment/messagecomment.saga';
import { postSagas } from './post/post.saga';
import { toolSagas } from './tool/tool.saga';
import { userSagas } from './user/user.saga';
import { userprofileSagas } from './userprofile/userprofile.saga';

export function* rootSaga() {
  yield* all([
    call(artificialIntelligenceSagas),
    call(chatSagas), 
    call(chatCommentSagas), 
    call(commentSagas), 
    call(favoriteSagas), 
    call(followerSagas), 
    call(messageSagas), 
    call(messageCommentSagas), 
    call(moonSagas), 
    call(moonCommentSagas),
    call(marauderSagas), 
    call(planetSagas), 
    call(planetcommentSagas),
    call(postSagas), 
    call(toolSagas), 
    call(userSagas),
    call(userprofileSagas)
]);
}