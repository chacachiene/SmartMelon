import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now()
    }
    }, { timestamps: true });

const History = mongoose.model("History", HistorySchema);
export default History;