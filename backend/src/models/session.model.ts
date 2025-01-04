import mongoose from "mongoose";
import { thirtyDaysFromNow } from "@/utils/date";

export interface SessionDocument extends mongoose.Document {
  sessionId: mongoose.Types.ObjectId;
  userAgent?: string;
  expiresAt: Date;
  createdAt: Date;
}

const sessionSchema = new mongoose.Schema<SessionDocument>({
  sessionId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
    index: true,
  },
  userAgent: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: thirtyDaysFromNow(),
  },
});

const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);

export default SessionModel;
