export const authSelector = state => state.auth?.token;
export const userSelector = state => state.auth?.user;
export const errorSelector = state => state.auth?.error;
export const loadingSelector = state => state.auth.isLoading;
export const modalOpenSelector = state => state.auth.modalOpen;
export const favoritesSelector = state => state.auth.user?.favorites;
export const userIdSelector = state => state.auth.user?.id;

