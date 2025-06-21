import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login, logout, getAccountInformation } from '@/services/auth';
import { IReqLoginDTO, IResLoginDTO, IUserGetAccountDTO, IUserLogin } from '@/types/auth';
import { TypeUserEnum } from '@/types/enums/TypeUserEnum';

interface UserState {
  user: IUserLogin | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  loginUser: (credentials: IReqLoginDTO) => Promise<{ success: boolean; error?: string }>;
  logoutUser: () => Promise<void>;
  clearError: () => void;
  refreshUserInfo: () => Promise<void>;
  setUser: (user: IUserLogin | null) => void;
  setToken: (token: string | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      loginUser: async (credentials: IReqLoginDTO) => {
        // Minimum loading time of 1.5s
        const startTime = Date.now();
        
        try {
          set({ isLoading: true, error: null });
          
          const response = await login(credentials);
          
          if (response) {
            const { access_token, user } = response;
            
            // Store token in localStorage
            if (typeof window !== 'undefined') {
              localStorage.setItem('access_token', access_token);
              
              // Log localStorage contents after saving
              console.log('=== localStorage Contents After Login ===');
              console.log('access_token:', localStorage.getItem('access_token'));
              console.log('All localStorage keys:', Object.keys(localStorage));
              console.log('Full localStorage:', { ...localStorage });
              console.log('========================================');
            }
            
            // Calculate remaining time to ensure minimum 1.5s loading
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, 1500 - elapsedTime);
            
            await new Promise(resolve => setTimeout(resolve, remainingTime));
            
            set({
              user,
              token: access_token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            
            // Log user information after setting state
            console.log('=== User Information After Login ===');
            console.log('User:', user);
            console.log('Token:', access_token);
            console.log('Is Authenticated:', true);
            console.log('===================================');
            
            return { success: true };
          } else {
            throw new Error('Đăng nhập thất bại');
          }
        } catch (error: any) {
          // Ensure minimum loading time even on error
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, 1500 - elapsedTime);
          
          await new Promise(resolve => setTimeout(resolve, remainingTime));
          
          const errorMessage = error?.response?.data?.message || 
                              error?.message || 
                              'Tên đăng nhập hoặc mật khẩu không chính xác';
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
          });
          
          return { success: false, error: errorMessage };
        }
      },

      logoutUser: async () => {
        try {
          set({ isLoading: true });
          await logout();
          
          // Clear token from localStorage
          if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
          }
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          // Even if logout fails, clear local state
          if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
          }
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      refreshUserInfo: async () => {
        try {
          const token = typeof window !== 'undefined' 
            ? localStorage.getItem('access_token') 
            : null;
          
          if (!token) {
            set({ user: null, token: null, isAuthenticated: false });
            return;
          }
          
          set({ isLoading: true });
          const response = await getAccountInformation();
          
          if (response && response.statusCode === 200 && response.data) {
            // Map IUserGetAccountDTO to IUserLogin
            const userLogin: IUserLogin = {
              id: response.data.id,
              hoTen: response.data.hoTen,
              email: response.data.email,
              vaiTro: response.data.vaiTro
            };
            
            set({
              user: userLogin,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error('Không thể lấy thông tin người dùng');
          }
        } catch (error: any) {
          // Clear invalid token
          if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
          }
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message || 'Phiên đăng nhập đã hết hạn',
          });
        }
      },

      setUser: (user: IUserLogin | null) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },

      setToken: (token: string | null) => {
        set({ token });
        
        if (typeof window !== 'undefined') {
          if (token) {
            localStorage.setItem('access_token', token);
          } else {
            localStorage.removeItem('access_token');
          }
        }
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selectors for better performance
export const useUser = () => {
  const { user, isAuthenticated, isLoading, error } = useUserStore();
  return { user, isAuthenticated, isLoading, error };
};

export const useUserActions = () => {
  const { loginUser, logoutUser, clearError, refreshUserInfo, setUser, setToken } = useUserStore();
  return { loginUser, logoutUser, clearError, refreshUserInfo, setUser, setToken };
};