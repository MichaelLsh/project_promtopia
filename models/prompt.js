import mongoose, { Schema, model, models } from "mongoose";

const promptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    prompt: {
        type: String,
        required: [true, "Please provide a prompt as required"],
    },
    tag: {
        type: String,
        required: [true, "Please provide a tag as required"],
    },
});

const Prompt = models.Prompt || model("Prompt", promptSchema);

export default Prompt;