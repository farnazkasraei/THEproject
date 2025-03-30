import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  user: {},
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const userIndex = state.users.findIndex(user => user.id === action.payload.id);
      state.users[userIndex] = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { addUser, deleteUser, updateUser, setUser } = usersSlice.actions;
export default usersSlice.reducer;
