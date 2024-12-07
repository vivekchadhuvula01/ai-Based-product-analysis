const { StringOutputParser } = require("@langchain/core/output_parsers");
const { ChatGroq } = require("@langchain/groq");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { config } = require("dotenv");
config();

const model = new ChatGroq({
    model: "llama-3.1-70b-versatile",
    apiKey: process.env.GROQ_API_KEY,
    temperature: 0.9
});

// const messages = [
//     new SystemMessage("Translate the following from English into {language}"),
//     new HumanMessage("hi!"),
// ];

const parser = new StringOutputParser();
// const result = await model.invoke(messages);
// await parser.invoke(result)
// chaining together

const chain = model.pipe(parser)


// console.log(res)
// prompt templates
const systemTemplate = "I PROVIDE A PRODUCT NAME AND SEARCH THROUGH THE AMAZON AND PROVIDE ME THE DEATIALS OF THE PRODUCT IN THE FORMAT OF TOP 5 BRANDS AND THEIR PRICE WITH A 3 SENTENCES OF DESCRIPTION {PRODUCT_NAME} NOTE:- AVOID THE PREVIEW FOR THE GENERATED RESULT. PROVIDE NECESSARY IMAGE LINKS";
const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["user", "{PRODUCT_NAME}"],
]);

const  promptValue =  promptTemplate.invoke({
    PRODUCT_NAME: 'WASHING MACHINE',

});

async function languagemodel(PRODUCT_NAME) {

    const languageAssistChain = promptTemplate.pipe(model).pipe(parser);
    const result = await languageAssistChain.invoke({ PRODUCT_NAME: `${PRODUCT_NAME}` });
    const history = []
    history.push(result)
    console.log(history)
}

module.exports = { languagemodel }

// languagemodel('EARPODS ');