import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    toggleSideBar: state => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleSideBar } = sideBarSlice.actions;
export default sideBarSlice.reducer;
