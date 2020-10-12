const { WebhookClient } = require('dialogflow-fulfillment');
const { DateTime } = require('luxon');

module.exports = {
  dialogflowFulfillmentMw,
}

function dialogflowFulfillmentMw(request, response) {
  const agent = new WebhookClient({ request, response });
  const { parameters } = request.body.queryResult;
  console.log(request.body.queryResult.parameters);
  // console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  // console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function logHours(agent) {
    const { date, ticket, hours } = parameters;

    let dt;
    if (date) dt = DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);

    if (!date) {
      agent.add('What day are you trying to report hours for?');
    } else if (!ticket) {
      agent.add(`Whick ticket are you trying to log hours against?`);
    } else if (!hours) {
      agent.add(`How many hours did you work${dt ? ' on ' + dt : ''}?`);
    } else {
      agent.add(`Nice! Cbot will log ${hours} hours on ${dt} against ticket ${ticket}!`);
    }
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
  intentMap.set('logHours', logHours);
  // intentMap.set('your intent name here', yourFunctionHandler);
  agent.handleRequest(intentMap);
}
