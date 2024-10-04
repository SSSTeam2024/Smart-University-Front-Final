import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Salle {
  _id: string;
  salle: string,
  emplacement: string,
  type_salle: string,
  departement:{
    _id: string;
  description: string,
  volume_horaire: string,
  nom_chef_dep: string,
  name_ar: string,
  name_fr: string,
  SignatureFileExtension:string;
  SignatureFileBase64String:string;
  signature:string
  }
}
export const salleSlice = createApi({
  reducerPath: "Salle",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/salle/`,
  }),
  tagTypes: ["Salle"],
  endpoints(builder) {
    return {
      fetchSalles: builder.query<Salle[], number | void>({
        query() {
          return `get-all-salle`;
        },
        providesTags: ["Salle"],
      }),

      addSalle: builder.mutation<void, Salle>({
        query(payload) {
          return {
            url: "/create-salle",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Salle"],
      }),
      updateSalle: builder.mutation<void, Salle>({
        query: ({ _id, ...rest }) => ({
          url: `/update-salle/${_id}`,
          method: "PUT",
          body: rest,
        }),
        invalidatesTags: ["Salle"],
      }),
      deleteSalle: builder.mutation<void, string>({
        query: (_id) => ({
          url: `delete-salle/${_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Salle"],
      }),
      fetchSalleById: builder.mutation<void, Salle>({
        query: ({ _id, ...rest }) => ({
          url: `/get-salle/${_id}`,
          method: "GET",
          body: rest,
        }),
        invalidatesTags: ["Salle"],
      }),
    };
  },
});

export const {
  useAddSalleMutation,
  useDeleteSalleMutation,
  useFetchSalleByIdMutation,
  useUpdateSalleMutation,
  useFetchSallesQuery
} = salleSlice;