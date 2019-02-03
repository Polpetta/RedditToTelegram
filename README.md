<div align="center"><img height=250 src="http://i.imgur.com/tO0DCQW.png"/></div>
<h2 align="center">RTT: A Reddit to Telegram bot</h2>
<p align="center">
  <a href="#"><b>homepage (WIP)</b></a> |
  <a href="#"><b>manual (WIP)</b></a> |
  <a href="#"><b>faq (WIP)</b></a> |
  <a href="https://github.com/Polpetta/RedditToTelegram/wiki"><b>wiki</b></a> |
  <a href="#"><b>chat (WIP)</b></a> |
  <a href="#"><b>news (WIP)</b></a>
</p>

***

<p align="justify">
  RTT (Reddit To Telegram) is a Bot that allows you to receive notification 
  when there is a new post on your favourite subreddit. <br>
</p>

***

<h3>Installation</h3>

It's very simple to deploy your own RTT bot. First of all you need to have a 
<a href="https://www.reddit.com/">Reddit</a> account and a Telegram bot (you 
can create it writing to the BotFather).
<a href="https://www.docker.com/">Docker</a> and docker-compose are strong 
prerequisites, but they're not mandatory.
Now clone the repository:
<br>
<code>
git clone https://github.com/Polpetta/RedditToTelegram.git
</code>
<br>
and, run:
<br>
<code>
npm install
</code>
<br>
To deploy the service you have to define some environment 
variables in a file called <code>bot-variables.env</code> (put this file in 
the root of the repository). The variables are:
<ul>
<li>USER_AGENT: this is necessary because Reddit want for each bot a 
particular user agent.
<li>CLIENT_ID: you can obtain this creating a new application from your 
account, selecting "script".
<li>CLIENT_SECRET: you will get also this code when creating a new 
application in your Reddit account.
<li>RUSERNAME: the Reddit username
<li>RPASSWORD: the Reddit password
<li>TTOKEN: the Telegram bot token
<li>SUBREDDITNAME: the subreddit name where fetch new posts. For the moment 
you can only fetch only from one subreddit
<li>ALLOW_NEW_SUBSCRIBERS: this is optional, and allow you to define if the 
bot can broadcast new posts to anyone who add it into a group or not
<li>NODE_ENV: it's optional, and it can only be set to <code>production</code>. 
Set this <strong>only</strong> if you're going to put the bot in a production
 mode.
<li>POLLING_TIME: it's an optional variable that defines how much RTT should
poll Reddit APIs. Default is every 5 seconds. Pay attention that an 
additional second is added to avoid Reddit APIs limitations. Requests that go 
over Reddit APIs limits are queued and processed when possible.
</ul>
Finally, if you have Docker and docker-compose installed on your system, just
run: <br>
<code>
npm run build && docker-compose up
</code>
<br>
Enjoy! :)

<h3>Contributing</h3>
At the moment, you can contribute posting bugs in the bug tracker.  If you 
have some code which you would like merge, then open a pull request. 
Please write tests and documentation of the new code too.

<h3>License</h3>
All the project's code is under GPL v3+.
