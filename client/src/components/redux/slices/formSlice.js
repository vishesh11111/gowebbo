import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entries: [
    // {
    //   "id": Math.floor(Math.random() * 10000) + 6710200 * Math.floor(Math.random() * 1900),
    //   "value": "Name",
    //   "name": "name",
    //   "type": "text",
    //   "html_type": "input",
    //   "required": false,
    //   "disabled": true
    // },
    // {
    //   "id": Math.floor(Math.random() * 10000) + 6710200 * Math.floor(Math.random() * 1900),
    //   "value": "Age",
    //   "name": "age",
    //   "type": "text",
    //   "html_type": "input",
    //   "required": false,
    //   "disabled": true
    // },
    // {
    //   "id": Math.floor(Math.random() * 10000) + 6710200 * Math.floor(Math.random() * 1900),
    //   "value": "Select your occupation",
    //   "name": "",
    //   "type": "text",
    //   "html_type": "label",
    //   "required": false,
    //   "disabled": true
    // },
    // {
    //   "id": Math.floor(Math.random() * 10000) + 6710200 * Math.floor(Math.random() * 1900),
    //   "value": "Doctor",
    //   "name": "occupation",
    //   "type": "button",
    //   "html_type": "button",
    //   "required": false,
    //   "disabled": true
    // },
    // {
    //   "id": Math.floor(Math.random() * 10000) + 6710200 * Math.floor(Math.random() * 1900),
    //   "value": "Nurse",
    //   "name": "occupation",
    //   "type": "button",
    //   "html_type": "button",
    //   "required": false,
    //   "disabled": true
    // }
  ],
  selectedBox: {},
  slug: {
    slug: "",
    value: ""
  },
  loading: false,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addBox: (state, action) => {
      state.entries.push(action.payload);
    },
    handleSelectBox: (state, action) => {
      state.selectedBox = action.payload;
    },
    updateEntries: (state, action) => {
      state.entries = action.payload;
    },
    slugCreate: (state, action) => {
      state.slug = action.payload;
    },
    SetLoading: (state, action) => {
      state.loading = action.payload;
    },
  }
});

export const { addBox } = formSlice.actions;
export const { handleSelectBox } = formSlice.actions;
export const { updateEntries } = formSlice.actions;
export const { slugCreate } = formSlice.actions;
export const { SetLoading } = formSlice.actions;


export default formSlice.reducer;

