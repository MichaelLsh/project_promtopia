import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
    try {
        await connectToDB(); // connect to the database

        const prompts = await Prompt.find({}).populate('creator'); // get all the prompts from the database

        return new Response(JSON.stringify(prompts), {status: 200}); // return the prompts
    } catch (error) {
        return new Response("Failed to fetch prompts", {status: 500}); // return an error message
    }
}