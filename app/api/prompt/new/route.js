import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const {userId, prompt, tag} = await req.json(); // get the data from the request body

    try {
        await connectToDB(); // connect to the database
        const newPrompt = new Prompt({ creator: userId, prompt, tag }); // create a new prompt

        await newPrompt.save(); // save the new prompt to the database

        return new Response(JSON.stringify(newPrompt), {status: 201}); // return the new prompt
    } catch (error) {
        return new Response("Failed to create a new prompt", {status: 500}); // return an error message
    }
};