import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { callLogin, callLogout, callGetProfile } from '@/services/auth';
import { LoginCredentials, User } from '@/types/interfaces/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  refreshProfile: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        try {
          set({ isLoading: true, error: null });
          const response = await callLogin(credentials);

          if (response.data) {
            const { user, accessToken } = response.data;

            if (typeof window !== 'undefined') {
              localStorage.setItem('access_token', accessToken);
            }

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error(response.message || 'Đăng nhập thất bại');
          }
        } catch (error: any) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message || 'Có lỗi xảy ra khi đăng nhập',
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          await callLogout();

          if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
          }

          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
          }

          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      refreshProfile: async () => {
        try {
          const token =
            typeof window !== 'undefined'
              ? localStorage.getItem('access_token')
              : null;

          if (!token) {
            set({ user: null, isAuthenticated: false });
            return;
          }

          set({ isLoading: true });
          const response = await callGetProfile();

          if (response.data) {
            set({
              user: response.data,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error('Không thể lấy thông tin người dùng');
          }
        } catch (error: any) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
          }

          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message || 'Phiên đăng nhập đã hết hạn',
          });
        }
      },

      setUser: (user: User | null) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Optional: Tách selector cho hiệu suất tốt hơn
export const useAuth = () => {
  const { user, isAuthenticated, isLoading, error } = useAuthStore();
  return { user, isAuthenticated, isLoading, error };
};

export const useAuthActions = () => {
  const { login, logout, clearError, refreshProfile, setUser } = useAuthStore();
  return { login, logout, clearError, refreshProfile, setUser };
};
