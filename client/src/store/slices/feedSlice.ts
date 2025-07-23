import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserInfo } from "./userSlice";

interface FeedState {
  profiles: Partial<UserInfo>[];
  error: string | null;
  loading: boolean;
}

const initialState: FeedState = {
  profiles: [] as Partial<UserInfo>[],
  error: null,
  loading: false,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setProfiles(state, action: PayloadAction<Partial<UserInfo>[]>) {
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
