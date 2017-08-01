import getYouTubeID from 'get-youtube-id';
import createAction from './utils/create-action';
import createReducer from './utils/create-reducer';

export const set = createAction('SEARCH_SET');
export const setVideoId = createAction('SEARCH_SET_VIDEO_ID');

export const setValue = value => (dispatch) => {
  dispatch(set(value));

  const videoId = getYouTubeID(value);

  if (videoId) {
    dispatch(setVideoId(videoId));
  } else {
    dispatch(setVideoId(undefined));
  }
};

export const clear = () => dispatch => {
  dispatch(set(''));

  dispatch(setVideoId(undefined));
};

export default createReducer({
  input: '',
  videoId: undefined,
}, {
  [set.type]: input => ({ input }),
  [setVideoId.type]: videoId => ({ videoId }),
});
