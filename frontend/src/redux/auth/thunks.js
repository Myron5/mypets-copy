import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteToken, instance } from 'service/api/api';
import { setToken } from 'service/api/api';

export const austOperationThunk = createAsyncThunk(
  'auth/operations',
  async ({ endpoint, userInfo = {}, urlToken, actions }, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    if (endpoint === 'register' || endpoint === 'login') {
      try {
        const { data } = await instance.post(`users/${endpoint}`, userInfo);
        if (data.token) {
          setToken(data.token);
        }
        actions.resetForm();
        return data;
      } catch (error) {
        const { response } = error;
        return thunkAPI.rejectWithValue(response);
      }
    }

    if (endpoint === 'current' && token) {
      setToken(token);
      try {
        const { data } = await instance.get(`users/${endpoint}`);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
    if (endpoint === 'verify') {
      try {
        const { data } = await instance.get(`users/${endpoint}/${urlToken}`);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
    if (endpoint === 'google') {
      try {
        const { data } = await instance.get(`auth/${endpoint}`);
        window.location.replace(data.redirectUrl);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.post(`users/logout`);
      deleteToken();
      return data;
    } catch (error) {
      const { response } = error;
      return thunkAPI.rejectWithValue(response);
    }
  }
);
