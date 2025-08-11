/**
 * This is a file for code to run at startup, mainly to automate updating documents in MongoDB
 */

import Message from "./models/message.model";
import User from "./models/user.model";

async function migrateIsOnlineField() {
  const result = await User.updateMany(
    { isOnline: { $exists: false } },
    { $set: { isOnline: false } }
  );
  console.log(`Migration: ${result.modifiedCount} users updated`);
}

async function migrateMessageSenderField() {
  const result = await Message.updateMany(
    { senderId: { $exists: false }, sender: { $exists: true } },
    [
      {
        $set: { senderId: "$sender" },
      },
      {
        $unset: "sender",
      },
    ]
  );
  console.log(`Migration: ${result.modifiedCount} messages updated with senderId`);
}

export async function startupFunctions() {
  // initializeMigrations();
  // migrateMessageSenderField();
}