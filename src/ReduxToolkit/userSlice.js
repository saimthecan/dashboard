import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserByToken = createAsyncThunk(
  'user/fetchByToken',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/user', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Unable to fetch user');
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ username, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      if (response.data && response.data.token) {
        const userData = {
          username: response.data.username, // doğrudan username bilgisini alıyoruz
          token: response.data.token
        };
        console.log(userData, "userSlice");
        dispatch(setUser(userData));
        localStorage.setItem('user', JSON.stringify(userData));
        return response.data;
      } else {
        throw new Error('No user data returned');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);


export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().user;
    try {
      const response = await axios.post('http://localhost:5000/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      localStorage.removeItem('user');
      return response.data;
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.username;  // user yerine username kullanıyoruz
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.username;
        state.token = action.payload.token;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;