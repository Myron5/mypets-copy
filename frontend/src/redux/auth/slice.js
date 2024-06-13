import { createSlice } from '@reduxjs/toolkit';
import { austOperationThunk, logoutThunk } from './thunks';

const fullfiled = (state, { meta, payload = {} }) => {
  const {
    arg: { endpoint },
  } = meta;
  const { user, token } = payload;
  switch (endpoint) {
    case 'register':
      state.modalOpen = true;
      break;
    case 'login':
      state.user = user;
      state.token = token;
      break;
    case 'current':
      state.user = user;
      state.token = token;
      break;
    case 'verify':
      state.user = user;
      state.token = token;
      break;
    default:
      return;
  }
};

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, { payload: { data, status } }) => {
  state.isLoading = false;
  state.error = { data, status };
};

const logout = state => {
  state.user = {};
  state.token = '';
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    isLoading: false,
    token: '',
    error: null,
    modalOpen: false,
  },
  reducers: {
    closeModal: {
      reducer(state) {
        state.modalOpen = false;
      },
    },
    addGooglToken: {
      reducer(state, actions) {
        state.token = actions.payload;
      },
    },
  },
  extraReducers: builder => {
    builder
      .addCase(austOperationThunk.fulfilled, fullfiled)
      .addCase(logoutThunk.fulfilled, logout)

      .addMatcher(action => action.type.endsWith('/pending'), handlePending)
      .addMatcher(action => action.type.endsWith('/fulfilled'), handleFulfilled)
      .addMatcher(action => action.type.endsWith('/rejected'), handleRejected);
  },
});
export const { closeModal, addGooglToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
