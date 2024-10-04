import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export interface PapierAdministratif {
  _id?: string;
  nom_ar: string;
  nom_fr: string;
  category: string[];
}

export interface Paper {
  papier_administratif: PapierAdministratif;
  annee: string;
  remarques: string; 
  file: string;
  FileExtension:string;
  FileBase64String:string

}

export interface DossierAdministratif {
  dossierId?: string;
  papers: Paper[];
  enseignant?: {
    _id: string;
    nom_fr: string;
    nom_ar: string;
    prenom_fr: string;
    prenom_ar: string;
  };
  personnel?: {
    _id: string;
    nom_fr: string;
    nom_ar: string;
    prenom_fr: string;
    prenom_ar: string;
  };
}


export const dossierAdministratifSlice = createApi({
  reducerPath: "DossierAdministratif",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/dossierAdministratif/",
  }),
  tagTypes: ["DossierAdministratif"],
  endpoints(builder) {
    return {
      addDossierAdministratif: builder.mutation<void, DossierAdministratif>({
        query(payload) {
          return {
            url: "/create-dossier-administratif",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["DossierAdministratif"],
      }),
      fetchDossierAdministratif: builder.query<DossierAdministratif[], number | void>({
        query() {
          return `get-all-dossiers`;
        },
        providesTags: ["DossierAdministratif"],
      }),
      updateDossierAdministratif: builder.mutation<void, DossierAdministratif>({
        query: ({ dossierId, ...rest }) => ({
          url: `/update-dossier`,
          method: "PUT",
          body: { dossierId, ...rest },
        }),
        invalidatesTags: ["DossierAdministratif"],
      }),
  
    };
  },
});

export const {
useAddDossierAdministratifMutation,
useFetchDossierAdministratifQuery,
useUpdateDossierAdministratifMutation
} = dossierAdministratifSlice;