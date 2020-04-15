import { v4 as uuid } from 'uuid';

function genIds() {
  const ids = [];
  for (let i = 0; i < 15; i++) {
    ids.push({ taken: false, uuid: uuid() });
  }
  return ids;
}

export const uuids = {
  state: genIds(),
  reducers: {
    regen() {
      return genIds();
    },
    take(state, payload) {
      return state.map((idState) => {
        return {
          ...idState,
          taken: idState.taken || idState.uuid === payload,
        };
      });
    },
  },
};
