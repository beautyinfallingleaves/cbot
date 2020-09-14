require('dotenv').config();
const dialogflow = require('@google-cloud/dialogflow');

// projectId: ID of the GCP project where Dialogflow agent is deployed
const projectId = 'simplealarm-utoy';
// sessionId: String representing a random number or hashed user identifier
const sessionId = '123456';
// languageCode: Indicates the language Dialogflow agent should use to detect intents
const languageCode = 'en';

// Instantiates a session client
const sessionClient = new dialogflow.SessionsClient();
// The path to identify the agent that owns the created intent.
const sessionPath = sessionClient.projectAgentSessionPath(
  projectId,
  sessionId
);

// Keeping the context across queries lets us simulate an ongoing conversation with the bot
let context;

async function detectIntentWrapper(query, contexts) {
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
  };

  if (contexts && contexts.length > 0) {
    request.queryParams = {
      contexts: contexts,
    };
  }

  const responses = await sessionClient.detectIntent(request);
  // console.log('~~~ RESPONSES');
  // console.log(responses);
  console.log(`[Detected intent: ${responses[0].queryResult.intent.displayName}]`);
  console.log(`[Active contexts: ${responses[0].queryResult.outputContexts.map(c => c.name.replace(/^.*[\\\/]/, '')).join(', ')}]`);
  // console.log('~~~ FULFILLMENT MESSAGES');
  // console.log(responses[0].queryResult.fulfillmentMessages);
  // console.log('~~~ PARAMS');
  // console.log(responses[0].queryResult.parameters);
  return responses[0];
}

async function executeQuery(query) {
  try {
    const intentResponse = await detectIntentWrapper(query, context);
    console.log(
      `CBOT: ${intentResponse.queryResult.fulfillmentText}`
    );
    // Use the context from this response for next queries
    context = intentResponse.queryResult.outputContexts;
  } catch (error) {
    console.log(error);
  }
}

// this mocks a cli chat where you can submit text to the agent and see its replies
console.log('*** Welcome! Type something... ***');
const stdin = process.openStdin();
stdin.addListener('data', d => {
  // note:  d is an object, and when converted to a string it will
  // end with a linefeed.  so we (rather crudely) account for that  
  // with toString() and then trim()
  const input = d.toString().trim();
  executeQuery(input);
});
