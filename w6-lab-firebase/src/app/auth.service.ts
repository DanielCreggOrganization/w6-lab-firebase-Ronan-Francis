/**
 * Service responsible for handling authentication operations
 * including user registration, authentication, password reset, and sign out.
 */
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

/**
 * Interface for authentication request data
 */
interface UserAuthData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) {}

  /**
   * Registers a new user with email and password
   * @param email - The user's email
   * @param password - The user's password
   * @returns Promise resolving when registration is complete
   */
  async registerUser(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  /**
   * Authenticates a user with email and password
   * @param email - The user's email
   * @param password - The user's password
   * @returns Promise resolving when authentication is complete
   */
  async signInUser(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error('Error signing in user:', error);
      throw error;
    }
  }

  /**
   * Gets the current authenticated user
   * @returns The current User or null
   */
  fetchActiveUser(): Observable<User | null> {
    return from(new Promise<User | null>((resolve) => {
      resolve(this.auth.currentUser);
    }));
  }

  /**
   * Signs out the current user
   * @returns Promise resolving when sign out is complete
   */
  async signOutUser(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Error signing out user:', error);
      throw error;
    }
  }

  /**
   * Initiates password reset process for a user
   * @param email - The email address for password reset
   * @returns Promise resolving when email is sent
   */
  async resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }
}
