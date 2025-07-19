import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Profile {
  firstName: string;
  lastName: string;
  imageUrl: string;
  age: number;
  gender: string;
  about: string;
  skills: string[];
  _id: string;
}

interface FeedState {
  profiles: Profile[];
  error: string | null;
  loading: boolean;
}

const initialState: FeedState = {
  profiles: [] as Profile[],
  error: null,
  loading: false,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setProfiles(state, action: PayloadAction<Profile[]>) {
      state.profiles = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setProfiles, setError, setLoading } = feedSlice.actions;

export default feedSlice.reducer;
