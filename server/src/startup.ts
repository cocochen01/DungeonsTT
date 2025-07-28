/**
 * This is a file for code to run at startup, mainly to automate updating documents in MongoDB
 */

import User from "./models/user.model";

async function initializeMigrations() {
  const result = await User.updateMany(
    { isOnline: { $exists: false } },
    { $set: { isOnline: false } }
  );
  console.log(`Migration: ${result.modifiedCount} users updated`);
}

export async function startupFunctions() {
  // initializeMigrations();
}