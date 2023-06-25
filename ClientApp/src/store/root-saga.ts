import { all, call } from 'typed-redux-saga/macro';

import { actionSagas } from './action/action.saga';
import { artificialIntelligenceSagas } from './artificialintelligence/artificialintelligence.saga';
import { channelSagas } from './channel/channel.saga';
import { channelcommentSagas } from './channelcomment/channelcomment.saga';
import { chatSagas } from './chat/chat.saga';
import { chatCommentSagas } from './chatcomment/chatcomment.saga';
import { commentSagas } from './comment/comment.saga';
import { communitySagas } from './community/community.saga';
import { deviceSagas } from './device/device.saga';
import { favoriteSagas } from './favorite/favorite.saga';
import { followerSagas } from './follower/follower.saga';
import { gltfSagas } from './gltf/gltf.saga';
import { marauderSagas } from './marauder/marauder.saga';
import { memberSagas } from './member/member.saga';
import { messageSagas } from './message/message.saga';
import { noteSagas } from './note/note.saga';
import { messageCommentSagas } from './messagecomment/messagecomment.saga';
import { panelSagas } from './panel/panel.saga';
import { pinSagas } from './pin/pin.saga';
import { postSagas } from './post/post.saga';
import { toolSagas } from './tool/tool.saga';
import { userSagas } from './user/user.saga';
import { userprofileSagas } from './userprofile/userprofile.saga';

export function* rootSaga() {
  yield* all([
    call(actionSagas), 
    call(artificialIntelligenceSagas),
    call(channelSagas),
    call(channelcommentSagas),
    call(chatSagas), 
    call(chatCommentSagas), 
    call(commentSagas), 
    call(communitySagas), 
    call(deviceSagas), 
    call(favoriteSagas), 
    call(followerSagas), 
    call(gltfSagas), 
    call(marauderSagas), 
    call(memberSagas), 
    call(messageSagas), 
    call(messageCommentSagas), 
    call(noteSagas), 
    call(panelSagas), 
    call(pinSagas), 
    call(postSagas), 
    call(toolSagas), 
    call(userSagas),
    call(userprofileSagas)
  ]);
}