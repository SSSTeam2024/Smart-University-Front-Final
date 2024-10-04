import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface GradeEnseignant {
  _id: string;
  value_grade_enseignant: string;
  grade_fr: string;
  grade_ar: string;
}
export const gradeEnseignantSlice = createApi({
  reducerPath: "GradeEnseignant",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/grade-enseignant/`,
  }),
  tagTypes: ["GradeEnseignant"],
  endpoints(builder) {
    return {
      fetchGradesEnseignant: builder.query<GradeEnseignant[], number | void>({
        query() {
          return `get-all-grade-enseignant`;
        },
        providesTags: ["GradeEnseignant"],
      }),

      addGradeEnseignant: builder.mutation<void, GradeEnseignant>({
        query(payload) {
          return {
            url: "/create-grade-enseignant",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["GradeEnseignant"],
      }),
      updateGradeEnseignant: builder.mutation<void, GradeEnseignant>({
        query: ({ _id, ...rest }) => ({
          url: `/update-grade-enseignant/${_id}`,
          method: "PUT",
          body: rest,
        }),
        invalidatesTags: ["GradeEnseignant"],
      }),
      deleteGradeEnseignant: builder.mutation<void, string>({
        query: (_id) => ({
          url: `delete-grade-enseignant/${_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["GradeEnseignant"],
      }),
    };
  },
});

export const {
useAddGradeEnseignantMutation,
useDeleteGradeEnseignantMutation,
useFetchGradesEnseignantQuery,
useUpdateGradeEnseignantMutation
} = gradeEnseignantSlice;