import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

let count = 0;
let gptPrompt;
let question;
let prompt;
let userResponse;
let response = null;
let botResponse;

dotenv.config()
console.log(process.env.OPENAI_API_KEY)
// Create an instance of the OpenAI API configuration class with your API key
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

// Create an instance of the OpenAI API class with your API key
const openai = new OpenAIApi(configuration);

// Create an instance of the Express app and add CORS support to it
const app = express()
app.use(cors())
app.use(express.json()) // for parsing application/json 

// Create a route to handle the request
app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from PrepMe!'
    })
})

// Create a route to handle the request
app.post('/', async (req, res) => {
    try {
        // AI response
        if (count < 1) {
            prompt = req.body.prompt;
            gptPrompt = `You are a job interviewer for a software development company. 
            Create one interview questions for the following job description: ${prompt}`
            question = prompt
            count++;
        } else {
            userResponse = req.body.userResponse
            gptPrompt = `Please provide constructive feedback to my answer.\n This is the question: ${question} \n. 
            This is my answer: ${userResponse}`
            count++;
        }
        response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: gptPrompt, // The prompt is the text that the AI will use to generate a response.
            temperature: 0, // Higher values means the model will take more risks. (0-1)
            max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
            top_p: 1, // alternative to sampling with temperature, called nucleus sampling
            frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
            presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
        });
        botResponse = response.data.choices[0].text;
        // Send the response back to the client
        res.status(200).send({
            bot: response.data.choices[0].text,
        });
    } catch (error) {
        console.error(error)
        res.status(500).send(error || 'Something went wrong');
    }

})
app.post('/next', async (req, res) => {
    try {
        question = botResponse;
        gptPrompt = `Please provide me another interview question except ${question}`
        // AI response
        response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: gptPrompt, // The prompt is the text that the AI will use to generate a response.
            temperature: 0, // Higher values means the model will take more risks. (0-1)
            max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
            top_p: 1, // alternative to sampling with temperature, called nucleus sampling
            frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
            presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
        });
        botResponse = response.data.choices[0].text;
        // Send the response back to the client
        res.status(200).send({
            bot: response.data.choices[0].text,
        });
    } catch (error) {
        console.error(error)
        res.status(500).send(error || 'Something went wrong');
    }

})


app.listen(5000, () => console.log('AI server started on http://localhost:5000')) 