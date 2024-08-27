import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read the request for the prompt with the given id)
export const GET = async (req, { params }) => {
    try {
        await connectToDB(); // connect to the database

        const prompt = await Prompt.findById(params.id).populate('creator'); // get all the prompts from the database
        if (!prompt) return new Response("Prompt Not Found", { status: 404 }); // return an error message if the prompt is not found

        return new Response(JSON.stringify(prompt), {status: 200}); // return the prompts
    } catch (error) {
        return new Response("Failed to find the prompt", {status: 500}); // return an error message
    }
}

// PATCH (update the prompt with the given id)
export const PATCH  = async (req, {params}) => {
    const { prompt, tag } = await req.json(); // get the prompt and tag from the request body

    try {
        await connectToDB(); // connect to the database

        const existingPrompt = await Prompt.findById(params.id); // find the prompt with the given id

        if (!existingPrompt) {return new Response("Prompt Not Found", { status: 404 });} // return an error message if the prompt is not found

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save(); // save the updated prompt
        return new Response(JSON.stringify(existingPrompt), { status: 200 }); // return the updated prompt
    } catch (error) {
        return new Response("Failed to update the prompt", { status: 500 }); // return an error message
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and delete it
        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};