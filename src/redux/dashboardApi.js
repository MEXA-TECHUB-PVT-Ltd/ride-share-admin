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
    "updateBlockStatus",
    "updatePassword",
    "createPR",
    "getAllPR",
    "updatePR",
    "deletePR",
    "createDR",
    "getAllDR",
    "updateDR",
    "deleteDR",
    "createCT",
    "updateCT",
    "deleteCT",
    "getAllCC",
    "deleteComplaints",
    "getAllComplaints",
    "getAllCount",
    "getGraphicRepresent",
    "createAppLink",
    "getAppLink",
    "getAllContactUs",
    "updateCUStatus",
    "getAllByIns",
    "getUserWithDetails",
    "updateInsStatus",
    "createCC",
    "updateCC",
    "deleteCC",
    "getAllCC",
    "getAllRecentlyDeleted",
    "deleteUser",
    "getAdminTransactions",
    "getAdminWallet",
    "getAllRidesByUser",
    "deleteRide",
    "getVerificationRequests",
    "verifyDriver",
    "getVerificationRequestsByUser",
    "getWithdrawErrors",
    "getAllTransactionHistory",
  ],

  endpoints: (builder) => ({
    // dashboard page api's
    // all users api also use on the all users page
    getAllUsers: builder.query({
      query: ({
        page = 1,
        sortColumn = "id",
        sortOrder = "desc",
        is_verified_driver,
      }) => {
        console.log(is_verified_driver);
        let queryParams = `?page=${page}&limit=${100000}&sortField=${sortColumn}&sortOrder=${sortOrder}`;

        // Check if is_verified_driver is provided and not undefined
        // if (is_verified_driver !== undefined || is_verified_driver !== "all") {
        //   queryParams += `&is_verified_driver=${is_verified_driver}`;
        // }
        queryParams +=
          is_verified_driver === undefined
            ? ""
            : `&is_verified_driver=${is_verified_driver}`;

        return `users/getAllUsersWithDetails${queryParams}`;
      },
      providesTags: ["getAllUsers"],
    }),

    // universal api for getting all counts on the dashboard
    getAllCount: builder.query({
      query: () => `universal/getAllCount`,
      providesTags: ["getAllCount"],
    }),
    // graph API for users
    getGraphicRepresent: builder.query({
      query: ({ interval }) =>
        `users/getGraphicalRepresent?interval=${interval}`,
      providesTags: ["getGraphicRepresent"],
    }),
    // deleted users
    getAllRecentlyDeleted: builder.query({
      query: () => `users/getAllRecentlyDeleted?page=${1}&limit=${100000}`,
      providesTags: ["getAllRecentlyDeleted"],
    }),
    // app link
    createAppLink: builder.mutation({
      query: (body) => ({
        url: `app_link/create`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["createAppLink"],
    }),
    getAppLink: builder.query({
      query: ({ id }) => `app_link/get/${id}`,
      providesTags: ["getAppLink"],
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
    // users
    // getAllUsers: builder.query({
    //   query: () => `users/getAllUsersWithDetails`,
    //   providesTags: ["getAllUsers"],
    // }),

    updateBlockStatus: builder.mutation({
      query: (body) => {
        return {
          url: `users/updateBlockStatus`,
          method: "PUT",
          body: body,
        };
      },
      invalidatesTags: ["updateBlockStatus"],
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
      query: () => `passenger_rates/getAll?page=${1}&limit=${100000}`,
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
      query: () => `driver_rates/getAll?page=${1}&limit=${100000}`,
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
    // car/vehicle types
    createCT: builder.mutation({
      query: (body) => ({
        url: `vehicle_types/create`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["createCT"],
    }),
    updateCT: builder.mutation({
      query: (body) => ({
        url: `vehicle_types/update`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["updateCT"],
    }),
    deleteCT: builder.mutation({
      query: (body) => ({
        url: `vehicle_types/delete/${body.id}`,
        method: "Delete",
      }),
      invalidatesTags: ["deleteCT"],
    }),
    getAllCT: builder.query({
      query: () => `vehicle_types/getAll?page=${1}&limit=${100000}`,
      providesTags: ["getAllCT"],
    }),
    // car/vehicle colors
    createCC: builder.mutation({
      query: (body) => ({
        url: `vehicle_colors/create`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["createCT"],
    }),
    updateCC: builder.mutation({
      query: (body) => ({
        url: `vehicle_colors/update`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["updateCT"],
    }),
    deleteCC: builder.mutation({
      query: (body) => ({
        url: `vehicle_colors/delete/${body.id}`,
        method: "Delete",
      }),
      invalidatesTags: ["deleteCT"],
    }),
    getAllCC: builder.query({
      query: () => `vehicle_colors/getAll?page=${1}&limit=${100000}`,
      providesTags: ["getAllCC"],
    }),
    // complaints
    getAllComplaints: builder.query({
      query: () => `complaints/getAll`,
      providesTags: ["getAllComplaints"],
    }),
    deleteComplaints: builder.mutation({
      query: (body) => ({
        url: `complaints/delete/${body.id}`,
        method: "Delete",
      }),
      invalidatesTags: ["deleteComplaints"],
    }),
    // contact us
    getAllContactUs: builder.query({
      query: ({ limit, page }) => `contact_us/getAll?page=${1}&limit=${100000}`,
      providesTags: ["getAllContactUs"],
    }),
    updateCUStatus: builder.mutation({
      query: (body) => ({
        url: `contact_us/updateStatus`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["updateCUStatus"],
    }),
    // users
    getAllByIns: builder.query({
      query: () =>
        `users/getAllUserByInsuranceStatus/false?page=${1}&limit=${100000}`,
      providesTags: ["getAllByIns"],
    }),
    getUserWithDetails: builder.query({
      query: (id) => `users/getUserWithDetails/${id}`,
      providesTags: ["getUserWithDetails"],
    }),
    updateInsStatus: builder.mutation({
      query: (body) => ({
        url: `users/updateInsuranceStatus`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["updateInsStatus"],
    }),
    // delete user
    deleteUser: builder.mutation({
      query: (body) => ({
        url: `users/delete/${body.id}`,
        method: "Delete",
      }),
      invalidatesTags: ["deleteUser"],
    }),
    getAdminTransactions: builder.query({
      query: () => "payments/getAdminTransactionHistory",
      providedTags: ["getAdminTransactions"],
    }),
    getAllTransactionHistory: builder.query({
      query: () => "payments/getAllTransactionHistory",
      providedTags: ["getAllTransactionHistory"],
    }),
    getAdminWallet: builder.query({
      query: () => "payments/getAdminWallet",
      providedTags: ["getAdminWallet"],
    }),
    // rides
    getAllRidesByUser: builder.query({
      query: ({ user_id }) => `rides/getAllRideStatusByUsers/${user_id}`,
      providedTags: ["getAllRidesByUser"],
    }),
    deleteRide: builder.mutation({
      query: ({ id }) => {
        return {
          url: `rides/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["deleteRide"],
    }),
    // driver verification status update
    verifyDriver: builder.mutation({
      query: (body) => {
        return {
          url: `users/verifyDriver`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["verifyDriver"],
    }),
    // request for verification
    getVerificationRequests: builder.query({
      query: ({ limit, page = 1 }) => {
        console.log({ limit, page }); // Add this before the API call
        return `driver_verification_request/getAll?limit=${limit}&page=${page}`;
      },
      providedTags: ["getVerificationRequests"],
    }),
    getVerificationRequestsByUser: builder.query({
      query: (id) => {
        return `driver_verification_request/getByUser/${id}`;
      },
      providedTags: ["getVerificationRequestsByUser"],
    }),
    // Errors
    getWithdrawErrors: builder.query({
      query: () => {
        return `error_logs/getWithdrawErrors`;
      },
      providedTags: ["getWithdrawErrors"],
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
  useCreateCTMutation,
  useUpdateCTMutation,
  useDeleteCTMutation,
  useGetAllCTQuery,
  useGetAllComplaintsQuery,
  useDeleteComplaintsMutation,
  useUpdateBlockStatusMutation,
  useGetAllCountQuery,
  useGetGraphicRepresentQuery,
  useCreateAppLinkMutation,
  useGetAppLinkQuery,
  useGetAllContactUsQuery,
  useUpdateCUStatusMutation,
  useGetAllByInsQuery,
  useUpdateInsStatusMutation,
  useGetAllCCQuery,
  useCreateCCMutation,
  useUpdateCCMutation,
  useDeleteCCMutation,
  useGetAllRecentlyDeletedQuery,
  useDeleteUserMutation,
  useGetAdminTransactionsQuery,
  useGetAdminWalletQuery,
  useGetAllRidesByUserQuery,
  useDeleteRideMutation,
  useGetVerificationRequestsQuery,
  useVerifyDriverMutation,
  useGetUserWithDetailsQuery,
  useGetVerificationRequestsByUserQuery,
  useGetWithdrawErrorsQuery,
  useGetAllTransactionHistoryQuery,
} = dashboardApi;
