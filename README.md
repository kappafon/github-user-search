# github-user-search

> React / typescript app to lookup Github profiles via new GH v4 API using graphql.

User and Profile pages feature 'infinite scroll'

Queries are cached so searching for the same user or clicking the same profile will quickly display previousely fetched data

## Usage

### `yarn install`

### `yarn dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000)

TODO:

-   ~~Add pagination to user repos, and even users, cuz what am I sorting now? 😅 You guessed it; two ends and nothing in between~~
-   ~~Handle sorting refetch better~~
-   Cleanup the code (cleanup refactor, magic strings, magic colors...)
-   Back Button, Scroll to Top, Logout
-   Add more useful info about specific user profile and repos, possibly implement 'settings' to preselect what info to fetch on search
-   Dark mode ofc
-   Virtualisation
-   host the app on gh pages, env sepparation
-   write some tests

![Alt text](/src/assets/images/demo-update.gif?raw=true 'Optional Title')
