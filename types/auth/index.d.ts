export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgetPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface GlobalAuthResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ForgetPasswordResponse {
  message: string;
  resetToken: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  is_active?: boolean;
  wishlist_count?: number;
  cart_count?: number;
}
