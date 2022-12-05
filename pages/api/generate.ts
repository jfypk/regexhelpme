import { VercelRequest, VercelResponse } from "@vercel/node";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

const respondToPrompt = async (req: VercelRequest, res: VercelResponse) => {
    const translateToRegex = req.body.action === 'To Regex';

    const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(req.body.input, translateToRegex),
    top_p: 0.1,
    max_tokens: 150,
    });

    res.status(200).json({ result: completion.data.choices[0].text });
}

const generatePrompt = (input: string, toRegex: boolean) : string => {
    if(toRegex) {
        return `Regex that ${input}`;
    } else {
        return `Explain this regex in plain English:${input}`;
    }
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
