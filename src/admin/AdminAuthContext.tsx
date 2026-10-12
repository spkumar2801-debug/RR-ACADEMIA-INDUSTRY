import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db, isFirebaseInitialized } from "../services/firebase";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from "firebase/auth";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export interface AdminUserData {
  uid: string;
  email: string;
  role: "admin";
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthAttemptInfo {
  uid: string;
  email: string;
  stage: "firestore-permission-denied" | "allowlist-missing" | "role-denied" | "auth-failed";
  reason?: string;
}

export interface AdminAuthContextType {
  user: User | null;
  adminData: AdminUserData | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  authError: string | null;
  authAttempt: AuthAttemptInfo | null;
  isFirebaseConfigured: boolean;
  clearAuthAttempt: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [adminData, setAdminData] = useState<AdminUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authAttempt, setAuthAttempt] = useState<AuthAttemptInfo | null>(null);

  // Helper to verify administrator authorization in Firestore
  const verifyAdminAuthorization = async (authUser: User): Promise<AdminUserData> => {
    if (!db) {
      throw new Error("Firestore database is not connected.");
    }

    try {
      // 1. Direct UID-based document lookup: getDoc(doc(db, 'adminUsers', user.uid))
      const adminDocRef = doc(db, "adminUsers", authUser.uid);
      const adminDocSnap = await getDoc(adminDocRef);

      // 2. Validate document existence
      if (!adminDocSnap.exists()) {
        const notFoundErr: any = new Error(
          `Authentication succeeded, but account UID "${authUser.uid}" is not registered in the administrator directory (adminUsers collection in Cloud Firestore).`
        );
        notFoundErr.code = "admin-not-found";
        notFoundErr.authenticatedUid = authUser.uid;
        notFoundErr.authenticatedEmail = authUser.email;
        throw notFoundErr;
      }

      const data = adminDocSnap.data() as Partial<AdminUserData>;

      // 3. Confirm UID match if field is present in document
      if (data.uid && data.uid !== authUser.uid) {
        const mismatchErr: any = new Error(
          `Document UID "${data.uid}" does not match authenticated UID "${authUser.uid}".`
        );
        mismatchErr.code = "admin-uid-mismatch";
        mismatchErr.authenticatedUid = authUser.uid;
        throw mismatchErr;
      }

      // 4. Validate active boolean state
      if (typeof data.active !== "boolean" || !data.active) {
        const inactiveErr: any = new Error(
          "Access revoked. This administrator account has been deactivated in Cloud Firestore."
        );
        inactiveErr.code = "admin-deactivated";
        inactiveErr.authenticatedUid = authUser.uid;
        inactiveErr.authenticatedEmail = authUser.email;
        throw inactiveErr;
      }

      // 5. Validate admin role
      if (data.role !== "admin") {
        const roleErr: any = new Error(
          `Access restricted. Account UID "${authUser.uid}" has role "${data.role}" instead of "admin".`
        );
        roleErr.code = "admin-role-denied";
        roleErr.authenticatedUid = authUser.uid;
        roleErr.authenticatedEmail = authUser.email;
        throw roleErr;
      }

      return {
        uid: authUser.uid,
        email: authUser.email || data.email || "",
        role: "admin",
        active: true,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };
    } catch (err: any) {
      // Distinguish Firestore security rules permission denial from missing records
      if (err.code === "permission-denied" || err.message?.includes("Missing or insufficient permissions")) {
        const permErr: any = new Error(
          `Permission Denied: Cloud Firestore Security Rules rejected access to document adminUsers/${authUser.uid}. Please ensure firestore.rules has been published in the Firebase Console.`
        );
        permErr.code = "permission-denied";
        permErr.authenticatedUid = authUser.uid;
        permErr.authenticatedEmail = authUser.email;
        if (auth) {
          await firebaseSignOut(auth);
        }
        throw permErr;
      }

      // Sign out from Firebase Authentication if authorization fails
      if (auth) {
        await firebaseSignOut(auth);
      }
      throw err;
    }
  };

  useEffect(() => {
    if (isFirebaseInitialized && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          try {
            const verified = await verifyAdminAuthorization(firebaseUser);
            setUser(firebaseUser);
            setAdminData(verified);
            setAuthError(null);
            setAuthAttempt(null);
          } catch (err: any) {
            setUser(null);
            setAdminData(null);
            setAuthError(err.message || "Unauthorized session.");
          }
        } else {
          setUser(null);
          setAdminData(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    setAuthError(null);
    setAuthAttempt(null);

    if (!isFirebaseInitialized || !auth) {
      throw new Error(
        "Firebase Authentication service is unavailable. Please check your Firebase project configuration in .env."
      );
    }

    let authenticatedUser: User | null = null;

    try {
      // 1. Authenticate identity through Firebase Authentication
      const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
      authenticatedUser = cred.user;

      // 2. Validate administrator authorization against Firestore adminUsers allowlist
      const verified = await verifyAdminAuthorization(cred.user);

      setUser(cred.user);
      setAdminData(verified);
      setAuthError(null);
      setAuthAttempt(null);
    } catch (err: any) {
      setUser(null);
      setAdminData(null);

      const attemptUid = authenticatedUser?.uid || err.authenticatedUid || "";
      const attemptEmail = authenticatedUser?.email || err.authenticatedEmail || email.trim();

      // Handle granular Firestore permission & allowlist outcomes
      if (err.code === "permission-denied") {
        setAuthAttempt({
          uid: attemptUid,
          email: attemptEmail,
          stage: "firestore-permission-denied",
          reason: "Firestore Security Rules in Firebase Console are blocking read access to collection 'adminUsers'."
        });
      } else if (err.code === "admin-not-found") {
        setAuthAttempt({
          uid: attemptUid,
          email: attemptEmail,
          stage: "allowlist-missing",
          reason: `Account authenticated in Firebase Auth, but UID "${attemptUid}" is missing from Firestore "adminUsers" collection.`
        });
      } else if (err.code === "admin-role-denied" || err.code === "admin-deactivated") {
        setAuthAttempt({
          uid: attemptUid,
          email: attemptEmail,
          stage: "role-denied",
          reason: err.message
        });
      }

      // Handle common Firebase Auth error codes with professional messages
      let message = err.message || "Failed to authenticate administrator.";
      if (err.code === "auth/api-key-not-valid" || err.code === "auth/invalid-api-key") {
        message = "Firebase Authentication API key is rejected by Google Cloud (auth/api-key-not-valid). Please verify in Google Cloud / Firebase Console: 1) Identity Toolkit API is enabled, 2) API key restrictions allow Identity Toolkit, and 3) localhost is an authorized domain.";
      } else if (err.code === "auth/operation-not-allowed") {
        message = "Email/Password sign-in is not enabled in Firebase Console. Please enable Email/Password under Authentication > Sign-in method in project rr-academia.";
      } else if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        message = "Invalid email or password. Please verify your administrator credentials.";
      } else if (err.code === "auth/user-not-found") {
        message = "No administrator account found with this email address.";
      } else if (err.code === "auth/too-many-requests") {
        message = "Access temporarily disabled due to multiple failed login attempts. Please try again later.";
      } else if (err.code === "auth/network-request-failed") {
        message = "Network error. Please check your internet connectivity and try again.";
      } else if (err.code === "auth/invalid-email") {
        message = "The entered email address format is invalid.";
      }

      setAuthError(message);
      throw new Error(message);
    }
  };

  const logout = async () => {
    setUser(null);
    setAdminData(null);
    setAuthError(null);
    setAuthAttempt(null);

    if (isFirebaseInitialized && auth) {
      try {
        await firebaseSignOut(auth);
      } catch (err) {
        console.warn("Sign out error:", err);
      }
    }
  };

  const clearAuthAttempt = () => {
    setAuthAttempt(null);
    setAuthError(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        adminData,
        loading,
        login,
        logout,
        authError,
        authAttempt,
        isFirebaseConfigured: isFirebaseInitialized,
        clearAuthAttempt
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

export default AdminAuthContext;
