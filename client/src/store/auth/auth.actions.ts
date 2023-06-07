import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthForm } from "../../components/layout/header/right-elements/auth-form/AuthForm.interface";
import { IRegisterForm } from "../../components/pages/register/Register.interface";
import { IAuthData } from "../../services/auth/auth.interface";
import { AuthService } from "../../services/auth/auth.service";
import messageActions from "../message/message.slice";

const { addMsg } = messageActions;

export const register = createAsyncThunk<IAuthData, IRegisterForm>(
  `auth/register`,
  async (data, thunkAPI) => {
    try {
      const response = await AuthService.register(data);
      //Handle success
      thunkAPI.dispatch(
        addMsg({ message: "Реєстрація пройшла успішно", status: 200 })
      );

      return response;
    } catch (e: any) {
      thunkAPI.dispatch(
        addMsg({ message: e.response.data.message, status: e.response.status })
      );
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const login = createAsyncThunk<IAuthData, IAuthForm>(
  `auth/login`,
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await AuthService.login(email, password);
      //Handle success
      thunkAPI.dispatch(
        addMsg({ message: "Вхід пройшов успішно", status: 200 })
      );
      return response;
    } catch (e: any) {
      thunkAPI.dispatch(
        addMsg({ message: e.response.data.message, status: e.response.status })
      );
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const logout = createAsyncThunk<any, any>(
  `auth/logout`,
  async ({}, thunkAPI) => {
    thunkAPI.dispatch(
      addMsg({ message: "Вихід пройшов успішно", status: 200 })
    );
    return {};
  }
);
