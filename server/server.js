import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

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
        const prompt = req.body.prompt;
        // AI response
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `You are a job interviewer for a software development company. 
            Create one interview questions for the following job description: ${prompt}`, // The prompt is the text that the AI will use to generate a response.
            temperature: 0, // Higher values means the model will take more risks. (0-1)
            max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
            top_p: 1, // alternative to sampling with temperature, called nucleus sampling
            frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
            presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
        });
        // Send the response back to the client
        res.status(200).send({
            bot: response.data.choices[0].text
        });

    } catch (error) {
        console.error(error)
        res.status(500).send(error || 'Something went wrong');
    }
})

// Create a route to handle the request
app.post('/interviewQuestion', async (req, res) => {
    try {
        const prompt = req.body.response;
        // AI response
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `You are a job interviewer in an interview. You just asked the following question ${question}. The interviewee responded with ${prompt}.
             Grade their response out of 100 and create a bullet form list of ways their response could be improved upon using STAR format. Then can you give me another interview question.`, // The prompt is the text that the AI will use to generate a response.
            temperature: 0, // Higher values means the model will take more risks. (0-1)
            max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
            top_p: 1, // alternative to sampling with temperature, called nucleus sampling
            frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
            presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
        });
        // Send the response back to the client
        res.status(200).send({
            bot: response.data.choices[0].text
        });

    } catch (error) {
        console.error(error)
        res.status(500).send(error || 'Something went wrong');
    }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000')) 