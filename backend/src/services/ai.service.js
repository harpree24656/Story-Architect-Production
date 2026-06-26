// import dependencies
import OpenAI from 'openai'
import env from '../config/env.js'

const openai = new OpenAI({
    apikey: env.OPEN_AI_API_KEY
})

async function callOpenAI(systemPrompt, userPrompt){
    try{
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages:[
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ],
            max_tokens: 500,
            temperature: 0.8
        });
        return response.choices[0].message.content;
    }
    catch(error){
        const aiError  = new Error("AI service is currently unavailable")
        aiError.statusCode = 500
        throw aiError 
    }
}

// generate story Idea
async function generateStoryIdeas(prompt){
    const systemPrompt = `
        You are a creative writing assistant 
        helping writers build compelling stories.
        Be creative, inspiring and detailed.
    `
    const userPrompt = `
        Generate three unique idea based on the prompt: ${prompt}
        For each idea provide:
        - Title
        - Genre
        - Brief summary 
        - Main conflict
    `
    const result = await callOpenAI(systemPrompt, userPrompt)
    return result
}
// generate character suggestion
async function generateCharacterSuggestions(storyContext){
    const systemPrompt = `
        You are a creative writing assistant 
        specializing in character development.
        Create memorable and complex characters.
    `
    const userPrompt = `
        Based on the story context: ${storyContext}
        Suggest 3 interesting charcter with:
        - Name
        - Role (Protagonist/Antagonist/Supporting)
        - Key personality traits
        - Brief backstory
        - Motivation
    `
    const result = await callOpenAI(systemPrompt, userPrompt)
    return result
}
// generate plot suggestions
async function generatePlotSuggestions(storyContext) {
    const systemPrompt = `
        You are a creative writing assistant 
        specializing in plot development.
        Create engaging and surprising plot elements.
    `
    const userPrompt = `
        Based on this story context:
        ${storyContext}
        
        Suggest 3 interesting plot developments:
        - Plot twist or event
        - How it affects the story
        - Potential consequences
        - Character impact
    `
    const result = await callOpenAI(systemPrompt, userPrompt)
    return result
}

// generate world building ideas
async function generateWorldIdeas(storyContext) {
    const systemPrompt = `
        You are a creative writing assistant 
        specializing in world building.
        Create rich and immersive world elements.
    `
    const userPrompt = `
        Based on this story context:
        ${storyContext}
        
        Suggest interesting world building elements:
        - 2 unique locations with descriptions
        - 1 piece of ancient lore or history
        - 1 cultural tradition or practice
        - 1 unique relic or artifact
    `
    const result = await callOpenAI(systemPrompt, userPrompt)
    return result
}

export default {
    generateStoryIdeas,
    generateCharacterSuggestions,
    generatePlotSuggestions,
    generateWorldIdeas
}