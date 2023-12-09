import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: [
    "getAllUsers",
    "signIn",
    "forgotPassword",
    "verifyOtp",
    "resetPassword",
    "updatePassword",
    "createPR",
    "getAllPR",
    "updatePR",
    "deletePR",
    "createDR",
    "getAllDR",
    "updateDR",
    "deleteDR",
  ],
  endpoints: (builder) => ({
    // dashboard page api's
    // all users api also use on the all users page
    getAllUsers: builder.query({
      query: ({ page = 1, sortColumn = "id", sortOrder = "asc" }) =>
        `users/getAll?page=${page}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`,
      providesTags: ["getAllUsers"],
    }),
    // ! auth
    //  login
    signIn: builder.mutation({
      query: (body) => {
        return {
          url: `users/signIn`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["signIn"],
    }),
    //  forgot password
    forgotPassword: builder.mutation({
      query: (body) => {
        return {
          url: `users/forgotPassword`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["forgotPassword"],
    }),
    //  verify password
    verifyOtp: builder.mutation({
      query: (body) => {
        return {
          url: `users/verify_otp`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["verifyOtp"],
    }),
    //  reset password
    resetPassword: builder.mutation({
      query: (body) => {
        return {
          url: `users/resetPassword`,
          method: "PUT",
          body: body,
        };
      },
      invalidatesTags: ["resetPassword"],
    }),
    //  update password
    updatePassword: builder.mutation({
      query: (body) => {
        return {
          url: `users/updatePassword`,
          method: "PUT",
          body: body,
        };
      },
      invalidatesTags: ["updatePassword"],
    }),
    // passenger price
    createPR: builder.mutation({
      query: (body) => ({
        url: `passenger_rates/create`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["createPR"],
    }),
    getAllPR: builder.query({
      query: () => `passenger_rates/getAll`,
      providesTags: ["getAllPR"],
    }),
    updatePR: builder.mutation({
      query: (body) => ({
        url: `passenger_rates/update`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["updatePR"],
    }),
    deletePR: builder.mutation({
      query: (body) => ({
        url: `passenger_rates/delete/${body.id}`,
        method: "Delete",
      }),
      invalidatesTags: ["deletePR"],
    }),
    // driver price
    createDR: builder.mutation({
      query: (body) => ({
        url: `driver_rates/create`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["createDR"],
    }),
    getAllDR: builder.query({
      query: () => `driver_rates/getAll`,
      providesTags: ["getAllDR"],
    }),
    updateDR: builder.mutation({
      query: (body) => ({
        url: `driver_rates/update`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["updateDR"],
    }),
    deleteDR: builder.mutation({
      query: (body) => ({
        url: `driver_rates/delete/${body.id}`,
        method: "Delete",
      }),
      invalidatesTags: ["deleteDR"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useSignInMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useCreatePRMutation,
  useGetAllPRQuery,
  useUpdatePRMutation,
  useDeletePRMutation,
  useCreateDRMutation,
  useUpdateDRMutation,
  useDeleteDRMutation,
  useGetAllDRQuery,
} = dashboardApi;
