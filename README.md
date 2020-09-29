# Onboard.io :rocket: :checkered_flag:

![Test Image 4](https://github.com/MLH-Fellowship/onboardio/blob/master/onboardio.png)

## Introduction

Onboard.io helps admins and management teams quickly onboard their new hires. Long gone are the days where you had to visit each platform and send invites to your newest team members. Onboard.io handles this tedious task for you, just enter the email and choose one of the pre-designed flows, and you’re done. Email invites from each of the selected platforms will be sent out automatically!

### Currently Supported Services


1. Github
2. Asana
3. Heroku


### Next-Phase Supported Services


1. Jira
2. Zoom
3. Bitbucket
4. Trello
5. Digital Ocean
6. Slack
7. Zoho
8. Discord


### How It Was Built

Onboard.io uses a React frontend paired with redux for state management. The backend is a typescript+express web server. We use OAuth 2.0 for all our API connection needs.

### Stack Used

React (Frontend).
Node[typescript+express] (Backend).
Heroku (Deployment).

### Setup

```
git clone https://github.com/MLH-Fellowship/onboardio.git
```

```
[Frontend + Backend]:yarn install,
                     yarn start:app [Runs the app in dev mode port:3000, with server on port:8080],
                     yarn test [Testing]
```


### Next Phase Of Onboard.io

1. Add Additional Onboarding Services as stated above.
2. Implementation of easy offboarding employees.
3. Implementation of Videos Upload to help Product Managers Explain Products to new Employee Via Video


### Challenges we ran into


Each service has its own flavor of OAuth authentication, so figuring out a communal endpoint
design to serve them all was challenging, as well as quite engaging. At certain points
during the development, we had to gather the entire team, hop onto a voice channel,
and work out a solution - fast! A ticking clock meant we always had to be on our toes,
which was quite demanding.
We also had to deal with a lot of API calls to and from a lot of different service providers,
so that was also quite a challenging task.
If a new service we added required an extra parameter,the entire flow structure had
to be modified to accommodate the new parameter.


### With Onboard.io, Revamping How Organizations Onboard!:+1::sparkling_heart:
