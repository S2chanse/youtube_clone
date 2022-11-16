import { createSlice } from '@reduxjs/toolkit';
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    _id: '',
    image: '',
    isAdmin: false,
    isLoading: false,
    isAuth: false,
    email: '',
  },
  reducers: {
    //로그인시 로그인 정보를  user에 채워준다.
    loginUser: (state, action) => {
      console.log('로그인', state);
      state.name = action.payload.name;
      state._id = action.payload._id;
      state.image = action.payload.image;
      state.email = action.payload.email;
      state.isLoading = true;
      state.isAuth = true;
      state.isAdmin = action.payload.isAdmin;
    },
    //로그 아웃 시, 로그인 정보 초기화
    clearUser: (state) => {
      state.name = '';
      state._id = '';
      state.image = '';
      state.email = '';
      state.isLoading = true;
      state.isAuth = false;
      state.isAdmin = false;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
