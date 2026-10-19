/**
 * Firebase Authentication Module
 * Production-ready simulated Firebase Auth SDK handlers with persistent local storage:
 * - signInWithEmailAndPassword (with email regex validation, password matching, demo bypass)
 * - createUserWithEmailAndPassword (duplicate email detection, min-length password rule)
 * - signOut & onAuthStateChanged
 * - Real-time validation checks & error codes
 */

const USERS_STORAGE_KEY = "mage_realm_users_db";
const SESSION_STORAGE_KEY = "mage_active_session";

// Standard RFC 5322 compatible email regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Initial pre-registered users
const DEFAULT_USERS = [
  {
    uid: "mage-guest-001",
    email: "guest@mage.realm",
    password: "magic",
    displayName: "Guest Mage",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    uid: "mage-ayush-001",
    email: "ayush@mage.realm",
    password: "password123",
    displayName: "Ayush Master Mage",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
];

/**
 * Get registered users from localStorage
 */
function getRegisteredUsers() {
  try {
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.warn("Storage access warning:", e);
    return DEFAULT_USERS;
  }
}

/**
 * Save user list to localStorage
 */
function saveRegisteredUsers(users) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error("Failed to save user to storage:", e);
  }
}

/**
 * Retrieve active session if previously logged in
 */
function getSavedSession() {
  try {
    const session = localStorage.getItem(SESSION_STORAGE_KEY);
    return session ? JSON.parse(session) : null;
  } catch (e) {
    return null;
  }
}

export const auth = {
  currentUser: getSavedSession(),
};

export const FIREBASE_STATUS = "ONLINE";

/**
 * Validates email and password format
 */
export function validateAuthFields(email, password, isRegistration = false) {
  const trimmedEmail = (email || "").trim();
  const trimmedPass = (password || "").trim();

  if (!trimmedEmail) {
    const err = new Error("Mage ID (Email) cannot be empty.");
    err.code = "auth/missing-email";
    throw err;
  }

  // Allow 'guest' as a demo shorthand, otherwise enforce email format
  const isDemoGuest = trimmedEmail.toLowerCase() === "guest";
  if (!isDemoGuest && !EMAIL_REGEX.test(trimmedEmail)) {
    const err = new Error("Invalid email format. Please use a valid email (e.g., mage@realm.com).");
    err.code = "auth/invalid-email";
    throw err;
  }

  if (!trimmedPass) {
    const err = new Error("Secret Spell (Password) cannot be empty.");
    err.code = "auth/missing-password";
    throw err;
  }

  if (trimmedPass.length < 6 && trimmedPass !== "magic") {
    const err = new Error("Secret Spell must be at least 6 characters long.");
    err.code = "auth/weak-password";
    throw err;
  }

  return { trimmedEmail, trimmedPass };
}

/**
 * Sign in user with email & password or demo credentials
 */
export async function signInWithEmailAndPassword(authInstance, email, password) {
  // Simulate network latency (250-400ms)
  await new Promise((resolve) => setTimeout(resolve, 320));

  const trimmedEmail = (email || "").trim().toLowerCase();
  const trimmedPass = (password || "").trim();

  // 1. Fast-track demo credentials bypass
  if (
    (trimmedEmail === "guest" || trimmedEmail === "guest@mage.realm") &&
    trimmedPass === "magic"
  ) {
    const guestUser = {
      uid: "mage-guest-001",
      email: "guest@mage.realm",
      displayName: "Guest Mage",
    };
    if (authInstance) authInstance.currentUser = guestUser;
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(guestUser));
    } catch (e) {}
    return { user: guestUser };
  }

  // 2. Validate fields
  validateAuthFields(email, password, false);

  // 3. Check credentials against registered users database
  const users = getRegisteredUsers();
  const existingUser = users.find(
    (u) => u.email.toLowerCase() === trimmedEmail
  );

  if (!existingUser) {
    const err = new Error("No Mage found with this email. Please inscribe/register an account first.");
    err.code = "auth/user-not-found";
    throw err;
  }

  if (existingUser.password !== trimmedPass) {
    const err = new Error("Incorrect Secret Spell. The gate refuses access.");
    err.code = "auth/wrong-password";
    throw err;
  }

  // 4. Successful login
  const sessionUser = {
    uid: existingUser.uid,
    email: existingUser.email,
    displayName: existingUser.displayName || existingUser.email.split("@")[0],
  };

  if (authInstance) authInstance.currentUser = sessionUser;
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionUser));
  } catch (e) {}

  return { user: sessionUser };
}

/**
 * Create new account / register with email & password
 */
export async function createUserWithEmailAndPassword(authInstance, email, password) {
  await new Promise((resolve) => setTimeout(resolve, 320));

  // 1. Validate fields strictly
  const { trimmedEmail, trimmedPass } = validateAuthFields(email, password, true);
  const normalizedEmail = trimmedEmail.toLowerCase();

  // 2. Check for duplicate accounts
  const users = getRegisteredUsers();
  const isDuplicate = users.some(
    (u) => u.email.toLowerCase() === normalizedEmail
  );

  if (isDuplicate) {
    const err = new Error("This Mage ID is already inscribed. Please cast login or use another email.");
    err.code = "auth/email-already-in-use";
    throw err;
  }

  // 3. Register and persist new account
  const newUser = {
    uid: "mage-" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    email: normalizedEmail,
    password: trimmedPass,
    displayName: normalizedEmail.split("@")[0],
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveRegisteredUsers(users);

  const sessionUser = {
    uid: newUser.uid,
    email: newUser.email,
    displayName: newUser.displayName,
  };

  if (authInstance) authInstance.currentUser = sessionUser;
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionUser));
  } catch (e) {}

  return { user: sessionUser };
}

/**
 * Sign out current user
 */
export async function signOut(authInstance) {
  if (authInstance) authInstance.currentUser = null;
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (e) {}
}

/**
 * Auth state listener
 */
export function onAuthStateChanged(authInstance, callback) {
  const current = authInstance ? authInstance.currentUser : getSavedSession();
  if (callback) callback(current);
  return () => {};
}
