import { create } from 'zustand';

export interface User {
  name: string;
  id: number | null;
}

export interface UserStore {
  user: User;
  setUser: (newUser: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: { name: '', id: null },
  setUser: (newUser) => set(() => ({ user: newUser })),
}));

export default useUserStore;
