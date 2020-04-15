import fire from '../../fire';

var provider = new fire.auth.GoogleAuthProvider();

export const authUser = {
  state: null,
  reducers: {
    _setUser(_, payload) {
      return payload;
    },
  },
  effects: (dispatch) => ({
    async login() {
      try {
        const result = await fire.auth().signInWithPopup(provider);
        const {
          user: { uid: id },
          additionalUserInfo: { profile },
        } = result;
        console.log(result);
        const user = {
          ...profile,
          id,
          gid: profile.id,
        };
        dispatch.authUser._setUser(user);
      } catch (error) {
        console.error(error);
      }
    },
    async logout() {
      try {
        // TODO:
        const result = await fire.auth().signOut();
        dispatch.authUser._setUser(null);
      } catch (error) {
        console.error(error);
      }
    },
  }),
};
