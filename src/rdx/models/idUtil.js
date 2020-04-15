import { v1 as uuidV1, v4 as uuidV4 } from 'uuid';
import { nanoid } from 'nanoid';

const STRAT_UUID_V1 = 'UUID v1';
const STRAT_UUID_V4 = 'UUID v4';
const STRAT_NANOID_10 = 'Short Id (10)';
const STRAT_NANOID = 'Short Id';
const STRATEGIES = [
  STRAT_UUID_V1,
  STRAT_UUID_V4,
  STRAT_NANOID,
  STRAT_NANOID_10,
];

function genIds(strategy) {
  const ids = [];
  let stratFunc;
  switch (strategy) {
    case STRAT_UUID_V1: {
      stratFunc = uuidV1;
      break;
    }
    case STRAT_NANOID: {
      stratFunc = nanoid;
      break;
    }
    case STRAT_NANOID_10: {
      stratFunc = () => nanoid(10);
      break;
    }
    case STRAT_UUID_V4:
    default: {
      stratFunc = uuidV4;
    }
  }
  for (let i = 0; i < 15; i++) {
    ids.push({ taken: false, id: stratFunc() });
  }
  return ids;
}

export const idUtil = {
  state: {
    strategies: STRATEGIES,
    strategy: STRAT_UUID_V4,
    ids: genIds(STRAT_UUID_V4),
  },
  reducers: {
    regen(_, payload) {
      return {
        strategies: STRATEGIES,
        strategy: payload,
        ids: genIds(payload),
      };
    },
    take(state, payload) {
      return {
        ...state,
        ids: state.ids.map(({ id, taken }) => {
          return {
            id,
            taken: taken || id === payload,
          };
        }),
      };
    },
  },
};
