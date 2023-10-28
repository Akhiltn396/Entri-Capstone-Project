import { createSlice } from "@reduxjs/toolkit";
const searchSlice = createSlice({
  name: "search",
  initialState: {
    destination:"",
    latitude: 10.1632,
    longitude : 76.6413,

    zoom: 6,
  },
  reducers: {
    search: (state, action) => {

      state.destination = action?.payload?.title;
      state.latitude = action?.payload?.location.coordinates[1];
      state.longitude = action?.payload?.location.coordinates[0];
      state.zoom = 8;
    },
    remove: (state, action) => {
      state.latitude = "";
      state.longitude = "";
      state.zoom = 0
    },
  },
});

export const { search, remove } = searchSlice.actions;

export default searchSlice.reducer;
