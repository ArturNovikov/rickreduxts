import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRickAndMortyCharacter } from "../api/rickandmorty";

export const getRickAndMortyCharacters = createAsyncThunk(
    "rickAndMorty/getCharacters",
    async ({ name, page }: { name: string; page: number }, { rejectWithValue }) => {
        try {
            const response = await fetchRickAndMortyCharacter(name, page);
            if(!response.ok) {
                if(response.status === 404) {
                    return rejectWithValue("Can't find...");
                };
                throw new Error("Something went wrong...");
            }
            const data = await response.json();
            return data.results;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("An unknown error occurred");
        };
    }
);

const initialState = {
    characters: [],
    status: "idle",
    error: null as string | null,
  };
  

const rickAndMortySlice = createSlice({
    name: "rickAndMorty",
    initialState,
    reducers: {
        resetState: () => {
            return initialState;
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRickAndMortyCharacters.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getRickAndMortyCharacters.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.characters = action.payload;
                state.error = null;
            })
            .addCase(getRickAndMortyCharacters.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
    },
});

export const { resetState } = rickAndMortySlice.actions;

export default rickAndMortySlice.reducer;