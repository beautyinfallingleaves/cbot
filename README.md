# Cbot
This is a rough proof-of-concept application for experimenting with Google's Natural Language Understanding platform, [Dialogflow](https://cloud.google.com/dialogflow/es/docs), via a CLI chat bot which simulates letting you log hours against Jira tickets using natural language; e.g., *"Yesterday I worked an hour and a half on the video site's header and footer."*

## Setup
1. Follow the Dialogflow [setup instructions](https://cloud.google.com/dialogflow/es/docs/quick/setup) to set up a Google Cloud project. This includes setting up a Service Account for authentication.
2. Clone this repo:  
`git clone https://github.com/beautyinfallingleaves/cbot.git`
3. Install dependencies:  
`cd cbot && npm install`
4. Rename `.env.example` to `.env` and replace values with those for your own Google project setup from step 1:
    - `PROJECT_ID` should be the ID of your Google Cloud project
    - `GOOGLE_APPLICATION_CREDENTIALS` should be the path to your Service Account credentials JSON file
    - `MONKEYLEARN_TOKEN` is optional, if you want to experiment with ML keyword extraction from ticket descriptions- I found it didn't add value for this context; teaching Dialogflow with just the ticket titles was surprisingly effective. You can leave this variable as-is if not using MonkeyLearn.
5. From the Dialogflow console, [import](https://cloud.google.com/dialogflow/es/docs/agents-settings#export) this repo's Dialogflow agent, `agent-backups/SimpleAlarm.zip`, into your Dialogflow project.
6. This application uses Dialogflow's webhook intent fulfillment, which  requires that you serve it over `https` and update the Dialogflow Fulfillment Webhook URL in the console to your endpoint: `https://your_url/dialogflow-webhook`. [ngrok](https://ngrok.com/) is an easy way to quickly set up a public `https` URL.
7. `npm start` to start the CLI agent and the Express server which handles intent fulfillment via webhook.

Reading the [Dialogflow basics](https://cloud.google.com/dialogflow/docs/basics) as suggested by the setup guide is highly recommended in order to understand what this application is doing.

*Note: the `actions-on-google` libary we use to handle webhook fulfillment requires that this application be run using Node v10.*

## Using Cbot
Try typing *"hi", "heya cbot",* or similar on the CLI- Cbot should recognize most normal greetings and suggest you ask it about finding tickets or logging hours.

Now try asking it to find tickets with *"find tickets", "load my tickets", "fetch my tickets",* or other permutations. This is just loading dummy ticket data (one day we'll do an actual fetch from Jira...), but under the hood, it's using Dialogflow Session Entities to train Cbot to recognize you speaking naturally/colloquially about these tickets, in order to find the right one when you ask it to log hours. **This step is necessary in order for ticket lookup to work.**

Finally, the fun part: ask Cbot to log some quantity of hours worked on some date against one of the fetched tickets. For example: *"Standup took 15min today", "Yesterday I worked an hour and a half on Logic Monitor," or, "I updated the video site's header for 20min last Tuesday."* Try logging hours in a bunch of different ways- Cbot should have a decent success rate at identifying the ticket, date, and quantity of time worked.

This is just a starting point- the agent could use *a lot* more fleshing out. If you find your requests are missing the mark, it's a great opportunity to experiment with fine tuning the agent in Dialogflow, such as adding additional training phrases, or even coming up with a better way of teaching it about dyanmically fetched tickets (right now, it's using only the ticket title to teach Dialogflow- a bit dubious).