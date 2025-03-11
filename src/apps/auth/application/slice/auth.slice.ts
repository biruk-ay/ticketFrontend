import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthState from "../state/auth.state";
import authRepository from "../../data/repository/auth.repository";
import type { RootState } from "../../../../store/store";
const initialState: AuthState = {

    isLoggedIn: false,
    name: null,
    email:  null,
    accessToken: null,
    role: null,
    id: null,
    loading: false,
    error: null

}

export const signup = createAsyncThunk<Omit<AuthState, "isLoggedIn" | "loading" | "error">, {name: string; email: string; password: string; role: string;}>(
    "auth/signup",
    async ({name, email, password, role}, thunkAPI) => {   
      try {
          const response = await authRepository.signup(name, email, password, role) as unknown as AuthState;
          return {
            name: response.name,
            email: response.email,
            token: response.accessToken,
            role: response.role,
            id: response.id

          };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }catch(error: any){
        return thunkAPI.rejectWithValue(error.message);
    }
}
);

export const login = createAsyncThunk<Omit<AuthState, "isLoggedIn" | "loading" | "error">, {email: string; password: string}>(
    "auth/login",
    async ({email, password}, thunkAPI) => {   
      try {
          const response = await authRepository.login(email, password) as unknown as AuthState;
          return {
            name: response.name,
            email: response.email,
            token: response.accessToken,
            role: response.role,
            id: response.id

          };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }catch(error: any){
        return thunkAPI.rejectWithValue(error.message);
    }
}
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {   
        try {
            await authRepository.logout();
        } catch(error) {
            console.error("Logout failed: ", error);
          return rejectWithValue(null);
      }
      return null;
  }
);

// export const refresh = createAsyncThunk(
//     "auth/refresh",
//     async (_, { rejectWithValue }) => {   
//       try {
//           const response = await authRepository.refresh() as unknown as AuthState;
//           localStorage.setItem("accessToken", response.token as string);
//           return {
//             token: response.accessToken,
//           };
//       } catch {
//         return rejectWithValue(null);
//     }
// }
// );

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.loading = false;
                state.name = action.payload.name;
                state.email = action.payload.email;
                state.accessToken = action.payload.accessToken;
                state.role = action.payload?.role || null;
                state.id = action.payload.id;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })           
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.name = action.payload.name;
                state.email = action.payload.email;
                state.accessToken = action.payload.accessToken;
                state.role = action.payload.role;
                state.id = action.payload.id;
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // .addCase(refresh.fulfilled, (state, action) => {
            //     state.accessToken = action.payload.token;
            //     state.isLoggedIn = true;
            // })
            // .addCase(refresh.rejected, (state) => {
            //     state.accessToken = null;
            //     state.isLoggedIn = false;
            // })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.name = null;
                state.email = null;
                state.accessToken = null;
                state.role = null;
                state.id = null;
                state.loading = false;   
                localStorage.removeItem("accessToken");         
            });
    },
})

export default AuthSlice.reducer;

export const selectUserEmail = (state: RootState) => state.auth.email;
export const selectUserName = (state: RootState) => state.auth.name;
export const selectUserRole = (state: RootState) => state.auth.role;
