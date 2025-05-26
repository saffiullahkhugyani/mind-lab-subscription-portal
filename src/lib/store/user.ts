import { User } from '@supabase/supabase-js'
import { create } from 'zustand'

interface UserState {
    user: User | null
    setUser: (user: User) => void
    removeUser: () => void
    isLoggedIn: () => boolean
}

const initialState = {
    user: null,
}

export const useUserStore = create<UserState>()((set, get) => ({
    ...initialState,
    setUser: (user: User) => set({ user }),
    removeUser: () => set({ user: null }),
    isLoggedIn: () => !!get().user,
}))