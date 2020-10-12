const  { dialogflow } = require('actions-on-google');
const { sessionEntitiesHelper } = require('actions-on-google-dialogflow-session-entities-plugin')
const { DateTime } = require('luxon');
const MonkeyLearn = require('monkeylearn');
const { dummyTickets } = require('./jira-cases');


const fulfillmentMw = dialogflow()
  .use(sessionEntitiesHelper());

fulfillmentMw.intent('loadTickets', conv => {
  conv.ask('Loading tickets...')

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

async function sessionEntitiesFromTickets(tickets) {
  const ml = new MonkeyLearn(process.env.MONKEYLEARN_TOKEN);
  const modelId = 'ex_YCya9nrn';

  // join ticket id, title, and contents into a long string to parse for keywords via MonkeyLearn
  const textToParse = tickets.map(t => ({
    external_id: t.name,
    text: Object.values(t).join(' '),
  }));

  const result = await ml.extractors.extract(modelId, textToParse);

  return result.body.map(t => ({
    value: t.external_id,
    synonyms: [
      t.name,
      t.title,
      ...t.extractions.map(e => e.parsed_value)
    ],
  }))
}

fulfillmentMw.intent('logHours', (conv, { date, ticket, hours }) => {
  let dt;
  if (date) dt = DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);

  if (!date) {
    conv.ask('What day are you trying to report hours for?');
  } else if (!ticket) {
    conv.ask(`Whick ticket are you trying to log hours against?`);
  } else if (!hours) {
    conv.ask(`How many hours did you work?`);
  } else {
    conv.ask(`Nice! Cbot will log ${hours} hours on ${dt} against ticket ${ticket}!`);
  }
});

module.exports = {
  fulfillmentMw,
}
