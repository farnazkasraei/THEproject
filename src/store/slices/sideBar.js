import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: 'menu,',
};

const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    toggleSideBar: (state, action) => {
      state.type = state.isOpen ? 'menu' : action.payload;
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleSideBar } = sideBarSlice.actions;
export default sideBarSlice.reducer;
