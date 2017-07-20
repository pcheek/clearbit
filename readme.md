# Tutorator

New user just signed up? About to jump on a call with a prospective customer? The Clearbit Bot for Cisco Spark is here to help.

The Clearbit Cisco Spark integration transforms an email address into a complete user profile, enriching your customer understanding, and delivering that data directly to Cisco Spark where your team can take action.

With nothing more than an email address you can identify an individual with an enriched user provide, which includes the individual's details, as well as complete company intelligence, allowing your team to immediately identify high value prospects and easily assess trends in new user signups.

Clearbit searches hundreds of data sources in real-time for every contact, so you get the most comprehensive, up-to-date profile possible.

To instantly enrich an email, use the lookup command: `@Clearbit lookup`

### Getting Started

There are a few steps to get started on working with the Tutorator bot:

#### Installing Tutorator

[Deploy to Heroku](https://heroku.com/deploy?template=https://github.com/pcheek/clearbit/master)

Clone this repository:

`git clone https://github.com/pcheek/clearbit.git`

Install dependencies, including [Botkit](https://github.com/howdyai/botkit):

```
cd clearbit
npm install
```

#### Environment Setup

You need to define these environment variables:

```
access_token
public_address
secret
studio_token
clearbit_publishable_key
clearbit_secret_key
```

#### Botkit Setup

You need to import the Botkit script named 'lookup' into Botkit Studio. You can find the export in: `/scripts.json`

#### Usage

To use, add the Clearbit Bot (clearbit@sparkbot.io) to your Cisco Spark team. Invite the Clearbit Bot to a space and send the Bot a message like so: `@Clearbit lookup`. Or, open a private message with the Clearbit Bot and say `lookup`. The Clearbit Bot will then prompt you for the email address to look up. 

#### Todos

- Add company information to enriched profile in Cisco Spark.
- Add support for Clearbit's Prospector solution.

# About Clearbit for Cisco Spark 

Tutorator is a project for the [Cisco Spark Industry Challenge](https://ciscospark.devpost.com/)
