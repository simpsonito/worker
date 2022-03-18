import * as mongoose from "mongoose";

export interface EventResult {
  event: string,
  horse: {
    id: number,
    name: string
  },
  time: number,
}
const HorseSchema = new mongoose.Schema({
  id: Number,
  name: String,
});
const EventResultSchema = new mongoose.Schema({
  event: String,
  horse: HorseSchema,
  time: Number,
  created_at: { type: Date, required: true, default: Date.now }
});
export const EventResult = mongoose.model<EventResult>("EventResult", EventResultSchema);