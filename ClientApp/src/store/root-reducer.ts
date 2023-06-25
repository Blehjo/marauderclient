import { combineReducers } from 'redux';

import { actionReducer } from './action/action.reducer';
import { artificialIntelligenceReducer } from './artificialintelligence/artificialintelligence.reducer';
import { builderReducer } from './builder/builder.reducer';
import { channelReducer } from './channel/channel.reducer';
import { channelcommentReducer } from './channelcomment/channelcomment.reducer';
import { chatReducer } from './chat/chat.reducer';
import { chatcommentReducer } from './chatcomment/chatcomment.reducer';
import { commentReducer } from './comment/comment.reducer';
import { communityReducer } from './community/community.reducer';
import { favoriteReducer } from './favorite/favorite.reducer';
import { followerReducer } from './follower/follower.reducer';
import { interfaceReducer } from './interface/interface.reducer';
import { marauderReducer } from './marauder/marauder.reducer';
import { memberReducer } from './member/member.reducer';
import { messageReducer } from './message/message.reducer';
import { messagecommentReducer } from './messagecomment/messagecomment.reducer';
import { noteReducer } from './note/note.reducer';
import { pinReducer } from './pin/pin.reducer';
import { postReducer } from './post/post.reducer';
import { profileReducer } from './profile/profile.reducer';
import { sceneReducer } from './scene/scene.reducer';
import { toolReducer } from './tool/tool.reducer';
import { toolboxReducer } from './toolbox/toolbox.reducer';
import { userReducer } from './user/user.reducer';
import { userprofileReducer } from './userprofile/userprofile.reducer';
import { deviceReducer } from './device/device.reducer';
import { gltfReducer } from './gltf/gltf.reducer';
import { panelReducer } from './panel/panel.reducer';

export const rootReducer = combineReducers({
  action: actionReducer,
  artificialIntelligence: artificialIntelligenceReducer,
  builder: builderReducer,
  channel: channelReducer,
  channelcomment: channelcommentReducer,
  chat: chatReducer,
  chatcomment: chatcommentReducer,
  community: communityReducer,
  comment: commentReducer,
  device: deviceReducer,
  favorite: favoriteReducer,
  follower: followerReducer,
  gltf: gltfReducer,
  interface: interfaceReducer,
  pin: pinReducer,
  message: messageReducer,
  messagecomment: messagecommentReducer,
  member: memberReducer,
  marauder: marauderReducer,
  note: noteReducer,
  panel: panelReducer,
  post: postReducer,
  profile: profileReducer,
  scene: sceneReducer,
  tool: toolReducer,
  toolbox: toolboxReducer,
  user: userReducer,
  userprofile: userprofileReducer,
  ui: interfaceReducer
});