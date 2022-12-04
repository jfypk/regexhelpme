import { VercelRequest, VercelResponse } from "@vercel/node";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

const respondToPrompt = async (req: VercelRequest, res: VercelResponse) => {
    // check if the prompt is a valid regex
    const regex = req.body.regex;
    if(isRegexValid(regex)) {
        // check if the prompt is in the cache first
        const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(regex),
        top_p: 0.1,
        max_tokens: 150,
        });
        res.status(200).json({ result: completion.data.choices[0].text });
    } else {
        res.status(200).json({ result: "Sorry, I received an invalid regular expression. Please try again." });
    }
}

const generatePrompt = (regex: string) : string => {
    return `Explain this regex in plain English:${regex} can you simplify this regex?`;
}

const isRegexValid = (regex: string): boolean => {
    try {
        new RegExp(regex);
        return true;
    } catch (e) {
        return false;
    }
}

export default respondToPrompt;
