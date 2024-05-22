import { configureStore } from "@reduxjs/toolkit";
import rickAndMortyReducer from "./rickandmortySlice";

const store = configureStore({
    reducer: {
        rickAndMorty: rickAndMortyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;