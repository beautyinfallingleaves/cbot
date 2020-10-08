const { WebhookClient } = require('dialogflow-fulfillment');

module.exports = {
  dialogflowFulfillmentMw,
}

function dialogflowFulfillmentMw(request, response) {
  const agent = new WebhookClient({ request, response });
  // console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  // console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function webhookTest(agent) {
    agent.add('[wh fulfillment] test success!');
  }

  function webhookTest2(agent) {
    agent.add('[wh fulfillment] this is the 2nd agent!');
  }

  function logHours(agent) {
    agent.add('[wh fulfillment] yeah, lets log hours!!');
  }

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }


  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('webhookTest', webhookTest);
  intentMap.set('webhookTest2', webhookTest2);
  intentMap.set('logHours', logHours);
  // intentMap.set('your intent name here', yourFunctionHandler);
  agent.handleRequest(intentMap);
}
