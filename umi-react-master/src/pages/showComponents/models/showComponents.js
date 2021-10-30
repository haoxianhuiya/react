
import { getList } from 'services/showComponents';

export default {
  namespace: 'showComponents',

  state: {
    data: []
  },

  effects: {
    *getList({ payload, callback }, { put, select, call }) {
      const res = yield call(getList, payload);
      if (callback) callback(res);
    },
  },

  reducers: {
    setData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clearData(state, { payload }) {
      return {
        ...state,
        data: [],
      };
    },
  },
};
