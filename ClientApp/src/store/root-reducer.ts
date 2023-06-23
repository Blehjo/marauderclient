import { combineReducers } from 'redux';
import { artificialIntelligenceReducer } from './artificialintelligence/artificialintelligence.reducer';
import { builderReducer } from './builder/builder.reducer';
import { chatReducer } from './chat/chat.reducer';
import { chatcommentReducer } from './chatcomment/chatcomment.reducer';
import { commentReducer } from './comment/comment.reducer';
import { favoriteReducer } from './favorite/favorite.reducer';
import { followerReducer } from './follower/follower.reducer';
import { interfaceReducer } from './interface/interface.reducer';
import { marauderReducer } from './marauder/marauder.reducer';
import { messageReducer } from './message/message.reducer';
import { messagecommentReducer } from './messagecomment/messagecomment.reducer';
import { memberReducer } from './moon/moon.reducer';
import { noteReducer } from './mooncomment/mooncomment.reducer';
import { planetReducer } from './planet/planet.reducer';
import { planetcommentReducer } from './planetcomment/planetcomment.reducer';
import { postReducer } from './post/post.reducer';
import { profileReducer } from './profile/profile.reducer';
import { sceneReducer } from './scene/scene.reducer';
import { toolReducer } from './tool/tool.reducer';
import { toolboxReducer } from './toolbox/toolbox.reducer';
import { userReducer } from './user/user.reducer';
import { userprofileReducer } from './userprofile/userprofile.reducer';

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
  pin: pinReducer,
  message: messageReducer,
  messagecomment: messagecommentReducer,
  member: memberReducer,
  marauder: marauderReducer,
  note: noteReducer,
  post: postReducer,
  profile: profileReducer,
  scene: sceneReducer,
  tool: toolReducer,
  toolbox: toolboxReducer,
  user: userReducer,
  userprofile: userprofileReducer,
  ui: interfaceReducer
});