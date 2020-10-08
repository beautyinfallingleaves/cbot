const dialogflow = require('@google-cloud/dialogflow');

// projectId: ID of the GCP project where Dialogflow agent is deployed.
const projectId = process.env.PROJECT_ID;
// sessionId: String representing a random number or hashed user identifier.
const sessionId = '123456';
// languageCode: Indicates the language Dialogflow agent should use to detect intents.
const languageCode = process.env.LANGUAGE_CODE;

// Instantiates a session client.
const sessionClient = new dialogflow.SessionsClient();
// The path to identify the agent that owns the created intent.
const sessionPath = sessionClient.projectAgentSessionPath(
  projectId,
  sessionId
);

// Keeping contexts across queries lets us simulate an ongoing conversation with cbot.
let context;

async function askDialogflow(query, contexts) {
  // Assemble a request for Dialogflow based on the user's input.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
  };

  // If there are any existing contexts, add them to the Dialogflow request as query params.
  if (contexts && contexts.length > 0) request.queryParams = { contexts };

  // Send the request to Dialogflow, which will try to match an Intent, and respond.
  const responses = await sessionClient.detectIntent(request);

  // console.log('~~~ RESPONSES');
  // console.log(responses);
  console.log(`\n[Detected intent: ${responses[0].queryResult.intent.displayName}]`);
  console.log(`[Active contexts: ${responses[0].queryResult.outputContexts.map(c => c.name.replace(/^.*[\\\/]/, '')).join(', ')}]`);
  // console.log('~~~ FULFILLMENT MESSAGES');
  // console.log(responses[0].queryResult.fulfillmentMessages);
  // console.log('~~~ PARAMS');
  // console.log(responses[0].queryResult.parameters);
  return responses[0];
}

async function handleUserInput(query) {
  try {
    const intentResponse = await askDialogflow(query, context);

    // Print cbot's response to the CLI
    console.log(`\nCBOT: ${intentResponse.queryResult.fulfillmentText}`);

    // Use the context(s) from this response for the next query
    context = intentResponse.queryResult.outputContexts;
  } catch (error) {
    console.log(error);
  }
}

// this mocks a cli chat where you can submit text to the agent and see its replies
console.log('*** CBOT WELCOMES YOU ***');
const stdin = process.openStdin();
stdin.addListener('data', d => {
  const input = d.toString().trim();
  handleUserInput(input);
});
