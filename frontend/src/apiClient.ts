/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { RegisterFormData } from "./components/RegisterForm";
import { LoginFormData } from "./components/LoginForm";
import { SubjectType } from "../../backend/src/shared/types";

const API_BASE_URL = "http://localhost:8000";

export const register = async (formData: RegisterFormData) => {
  try {
    console.log("Registering with API:", `${API_BASE_URL}/api/auth/register`);

    const response = await axios.post(
      `${API_BASE_URL}/api/auth/register`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw new Error("Registration failed");
  }
};

export const Login = async (formData: LoginFormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Login failed");
  }
};

export const logout = async () => {
  await axios.post(
    `${API_BASE_URL}/api/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const validateToken = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/auth/validate-token`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

export const subjects = async (sem: number) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/semesters/subjects/${sem}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const subject = async (id: string): Promise<SubjectType> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/semesters/subject/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching subject details");
  }
};
