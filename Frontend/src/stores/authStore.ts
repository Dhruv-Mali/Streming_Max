import { createStore, StateCreator } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import api from "@/utils/api";
import { User } from "@/types";

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  loading?: boolean;
  fetchAuth: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateSession: () => Promise<void>;
}

const createAuthSlice: StateCreator<AuthState> = (set) => ({
  isLoggedIn: false,
  user: null,
  loading: false,
  fetchAuth: async () => {
    try {
      set({ loading: true });
      const response = await api.get("/auth/me");
      if (response.status === 200) {
        set({ isLoggedIn: true, user: response.data.user, loading: false });
      } else {
        set({ isLoggedIn: false, user: null, loading: false });
      }
    } catch (error) {
      console.error("Error fetching auth");
      set({ isLoggedIn: false, user: null, loading: false });
    }
  },
  signIn: async (email: string, password: string) => {
    set({ loading: true });
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.status === 200) {
        set({ isLoggedIn: true, user: response.data.user, loading: false });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      console.error("Error signing in:", error);
      set({ loading: false });
      throw error;
    }
  },
  updateSession: async () => {
    try {
      const response = await api.get("/auth/updateSession");
      console.log("updateSession response", response);
      if (response.status === 200) {
        set({ isLoggedIn: true, user: response.data.user, loading: false });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      console.error("Error updating session:", error);
    }
  },
  signOut: async () => {
    set({ loading: true });
    try {
      const response = await api.post("/auth/logout");
      if (response.status === 200) {
        set({ isLoggedIn: false, user: null, loading: false });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      console.error("Error signing out:", error);
      set({ loading: false });
    }
  },
});

export const createAuthStore = () =>
  createStore<AuthState>()(
    persist(createAuthSlice, {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    })
  );
