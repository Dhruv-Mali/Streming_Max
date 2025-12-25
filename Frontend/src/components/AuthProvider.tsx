"use client";

import { createContext, useRef, useContext, ReactNode } from "react";
import { useStore } from "zustand";
import { createAuthStore, AuthState } from "@/stores/authStore";

type AuthStoreType = ReturnType<typeof createAuthStore>;

const AuthStoreContext = createContext<AuthStoreType | null>(null);

export function AuthStoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AuthStoreType>();
  if (!storeRef.current) {
    storeRef.current = createAuthStore();
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
}

export function useAuthStore<T>(selector: (state: AuthState) => T): T {
  const store = useContext(AuthStoreContext);
  if (!store) throw new Error("Missing AuthStoreProvider in the tree");
  return useStore(store, selector);
}
