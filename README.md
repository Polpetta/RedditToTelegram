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
Reddit account and a Telegram bot (you can create it writing to the 
BotFather). Docker and docker-compose are strong prerequisites, but they're not 
mandatory.
Now clone 
the repository:
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
After, to deploy the service you have to define some environment 
variables in a file called <code>bot-variables.env</code> (put this file in 
the root of the repository):
<ul>
<li>USER_AGENT: this is necessary because Reddit want for each bot a 
particular user agent.
<li>CLIENT_ID: you can obtain this creating a new application from your 
account, selecting "script".
<li>CLIENT_SECRET: you will get also this code when creating a new 
application in your Reddit account.
<li>RUSERNAME: the Reddit username
<li>RPASSWORD: the Reddit password
<li>DBNAME: the name of the Redis database
<li>DBHOST: the ip or the address of a working Redis database. If you're 
going to use the <code>docker-compose.yml</code> already present in this 
report you can put here <code>database</code>
<li>TTOKEN: the Telegram bot token
<li>SUBREDDITNAME: the subreddit name where fetch new posts. For the moment 
you can only fetch only from one subreddit
<li>ALLOW_NEW_SUBSCRIBERS: this is optional, and allow you to define if the 
bot can broadcast new posts to anyone who add it into a group or not
<li>NODE_ENV: it's optional, and it can only be set to <code>production</code>. 
Set this <strong>only</strong> if you're going to put the bot in a production
 mode.
</ul>
Finally, if you have Docker and docker-compose installed on your system, just
run: <br>
<code>
docker-compose up
</code>
<br>
If you're not using Docker, you need to do some additional steps:
<br>
<code>
npm prune --production && \ # only for a production environment <br>
npm start
</code>
<br>
Enjoy! :)

<h3>Contributing</h3>
For the moment, you can contribute posting bugs in the bug tracker.  If you 
have some code which you would like to be merged, then open a pull request. 
Please write also tests and documentation of the new code.

<h3>License</h3>
All the project's code is under GPL v3+.