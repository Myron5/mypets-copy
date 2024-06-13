import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchPets,
  addPet,
  deletePet,
  addFlagFavorite,
  addToFavorit,
  fetchFavoritePets,
  fetchMyPets,
} from './operations';
import notify from 'service/addPetHelpers/toast';
import { noticeCategories } from 'constants/noticeCategories';

const contactsActions = [
  fetchPets,
  addPet,
  deletePet,
  addFlagFavorite,
  addToFavorit,
  fetchFavoritePets,
  fetchMyPets,
];
const getActions = type => contactsActions.map(action => action[type]);

export const petSlice = createSlice({
  name: 'pets',
  initialState: {
    items: [],
    pages: 0,
    myPets: [],
    favorites: [],
    isLoading: false,
    error: null,
    isNavigate: false,
  },
  extraReducers: builder =>
    builder
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.updatedNotices;
        state.pages = action.payload.pages;
        state.error = null;
      })
      .addCase(fetchFavoritePets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload;
        state.error = null;
      })
      .addCase(fetchMyPets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myPets = action.payload;
        state.error = null;
      })
      .addCase(addFlagFavorite.fulfilled, (state, action) => {
        state.items.map((item, index) => {
          const isFavorite = state.favorites.find(
            favorite => favorite.id === item.id
          );
          if (isFavorite) {
            state.items[index] = { ...item, favorite: true };
          } else {
            state.items[index] = { ...item, favorite: false };
          }
          return item;
        });

        state.isLoading = false;
        state.error = null;
      })
      .addCase(addToFavorit.fulfilled, (state, action) => {
        const { id } = action.payload.pet;
        const { categoryName } = action.payload;

        const isFavorite = state.favorites.find(item => item.id === id);
        if (isFavorite) {
          const index = state.favorites.findIndex(item => item.id === id);
          state.favorites.splice(index, 1);
          if (categoryName === noticeCategories.FAVORITE) {
            const index = state.items.findIndex(item => item.id === id);
            state.items.splice(index, 1);
          }
        } else {
          state.favorites.push(action.payload.pet);
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.isLoading = false;
        notify.success('Advertisement added successfully');
        state.isNavigate = true;
        state.error = null;
      })
      .addCase(deletePet.fulfilled, (state, action) => {
        const { id, category } = action.payload;
        const index = state.items.findIndex(item => item.id === id);

        state.items.splice(index, 1);
        state.isLoading = false;
        state.error = null;
        if (category === 'my-pet') {
          const index = state.myPets.findIndex(item => item.id === id);
          state.myPets.splice(index, 1);
        }
        notify.success('Advertisement  deleted successfully');
      })
      .addMatcher(isAnyOf(...getActions('pending')), state => {
        state.isLoading = true;
        state.error = null;
        state.isNavigate = false;
      })
      .addMatcher(isAnyOf(...getActions('rejected')), (state, action) => {
        state.isLoading = false;
        state.isNavigate = false;
        state.error = action.payload;
      }),
});

export const petReduser = petSlice.reducer;
