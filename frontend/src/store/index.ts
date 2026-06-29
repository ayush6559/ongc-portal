import { create } from 'zustand'

interface AppState {
  theme: 'light' | 'dark'
  isAuthenticated: boolean
  user: any | null
  setTheme: (theme: 'light' | 'dark') => void
  setIsAuthenticated: (value: boolean) => void
  setUser: (user: any | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  isAuthenticated: localStorage.getItem('isLoggedIn') === 'true',
  user: null,
  setTheme: (theme) => {
    set({ theme })
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  },
  setIsAuthenticated: (value) => {
    set({ isAuthenticated: value })
    localStorage.setItem('isLoggedIn', value ? 'true' : 'false')
  },
  setUser: (user) => set({ user }),
}))
