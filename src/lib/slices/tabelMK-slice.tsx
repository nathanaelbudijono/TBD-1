import { StateCreator } from "zustand";
import axios from "axios";
import { nextAPIUrl } from "@/constant/env";

export interface MK {
  rows: {
    ID_MK: string;
    NAME_MK: string;
    SKS: number;
  }[];
}

export interface MKState {
  mk: MK;
  getMK: () => Promise<void>;
  postMK: (id: string, mataKuliah: string) => Promise<void>;
  updateMK: (id: string, mataKuliah: string, slug: string) => Promise<void>;
  deleteMK: (slug: string) => Promise<void>;
  errorMessageMK: string;
  errorMessageUpdate: string;
}

export const mkSlice: StateCreator<MKState> = (set, get) => ({
  mk: { rows: [] },
  singleMK: { rows: [] },
  errorMessageMK: "",
  errorMessageUpdate: "",
  getMK: async () => {
    try {
      set({ errorMessageMK: "" });
      const res = await axios.get(`${nextAPIUrl}/matakuliah`);
      set({ mk: res.data });
    } catch (error: any) {
      set({ errorMessageMK: error.response.data.message });
    }
  },
  postMK: async (id: string, mataKuliah: string) => {
    try {
      await set({ errorMessageMK: "" });
      await axios.post(`${nextAPIUrl}/matakuliah`, {
        id,
        mataKuliah,
      });
    } catch (err: any) {
      set({ errorMessageMK: err.response.data.message });
    }
  },
  updateMK: async (id: string, mataKuliah: string, slug: string) => {
    try {
      await axios.put(`${nextAPIUrl}/unique/${slug}`, {
        id,
        mataKuliah,
        slug,
      });
    } catch (err: any) {
      console.log(err);
      set({ errorMessageUpdate: err.response.data.message });
    }
  },
  deleteMK: async (slug: string) => {
    try {
      await axios.delete(`${nextAPIUrl}/unique/${slug}`);
    } catch (err) {
      console.log(err);
    }
  },
});
