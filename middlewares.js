const  { dialogflow } = require('actions-on-google');
const { sessionEntitiesHelper } = require('actions-on-google-dialogflow-session-entities-plugin')
const { DateTime } = require('luxon');
// const MonkeyLearn = require('monkeylearn');
const { dummyTickets } = require('./jira-cases');


const fulfillmentMw = dialogflow()
  .use(sessionEntitiesHelper());

fulfillmentMw.intent('loadTickets', conv => {
  conv.ask('Let me know which ticket you want to log time against, how much time, and on which day.')

  // fake fetch tickets from jira, probably based on params like active sprint/assigned to this end-user
  console.log('~~ TICKETS', dummyTickets);

  // build sessionEntities from tickets via keyword extraction
  // const entities = await sessionEntitiesFromTickets(dummyTickets);
  // console.log('~~~ built entities', entities);

  // cheapo - just build sessionEntities from ticket name & title... seems to work better than keyword extraction?
  const entities = dummyTickets.map(t => ({
    value: t.name,
    synonyms: [ t.name, t.title ],
  }));

  conv.sessionEntities.clear();
  conv.sessionEntities.add({
    name: 'ticket',
    entities,
  });
  conv.sessionEntities.send();
});

fulfillmentMw.intent('logHours', (conv, { date, ticket, duration }) => {
  let dt;
  if (date) dt = DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);

  if (!date) {
    conv.ask('What day are you trying to report hours for?');
  } else if (!ticket) {
    conv.ask(`Whick ticket are you trying to log hours against?`);
  } else if (!duration) {
    conv.ask(`How much time did you spend?`);
  } else {
    conv.ask(`Nice! Cbot will log ${duration.amount}${duration.unit} on ${dt} against ticket ${ticket}!`);
  }
});

// async function sessionEntitiesFromTickets(tickets) {
//   const ml = new MonkeyLearn(process.env.MONKEYLEARN_TOKEN);
//   const modelId = 'ex_YCya9nrn';

//   // join ticket id, title, and contents into a long string to parse for keywords via MonkeyLearn
//   const textToParse = tickets.map(t => ({
//     external_id: t.name,
//     text: Object.values(t).join(' '),
//   }));

//   const result = await ml.extractors.extract(modelId, textToParse);

//   return result.body.map(t => ({
//     value: t.external_id,
//     synonyms: [
//       t.name,
//       t.title,
//       ...t.extractions.map(e => e.parsed_value)
//     ],
//   }))
// }

module.exports = {
  fulfillmentMw,
}
