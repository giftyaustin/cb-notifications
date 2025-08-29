import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const STORAGE_FILE = join(__dirname, '../../user-storage.json');

type UserData = {
  socketId: string;
  fcmToken: string;
};

type Storage = Record<string, UserData>;

/**
 * Load storage file or initialize empty object
 */
function loadStorage(): Storage {
  if (existsSync(STORAGE_FILE)) {
    const raw = readFileSync(STORAGE_FILE, 'utf-8');
    try {
      return JSON.parse(raw) as Storage;
    } catch {
      return {};
    }
  }
  return {};
}

/**
 * Save storage object back to file
 */
function saveStorage(data: Storage) {
  writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2));
}

/**
 * Store or update a user's socketId and fcmToken
 */
export function setUser(userId: string, socketId: string, fcmToken: string) {
  const data = loadStorage();
  data[userId] = { socketId, fcmToken };
  saveStorage(data);
}

/**
 * Get user info by userId
 */
export function getUser(userId: string): UserData | null {
  const data = loadStorage();
  return data[userId] || null;
}

/**
 * Delete user info
 */
export function removeUser(userId: string) {
  const data = loadStorage();
  delete data[userId];
  saveStorage(data);
}

/**
 * Get all users
 */
export function getAllUsers(): Storage {
  return loadStorage();
}
