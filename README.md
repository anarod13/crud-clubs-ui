# Crud-clubs-ui

Crud clubs UI is an interface that displays an English Football Clubs CRUD consuming from an API [`crud-clubs-api`](https://crud-clubs-api.onrender.com) 
It is built on Svelte with Typescript and is tested with Cypress and Vitest

You can check it out fully deploy here [Premier League UI](https://premier-league-crud.onrender.com)
If instead you wanna run it locally, take a look at the following instructions


## How to run it

<table>
    <thead>
        <tr>
            <th>npm run</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
    <tr>
        <td>dev</td>
        <td>Runs the app in dev mode</td>
    </tr>
    <tr>
        <td>test</td>
        <td>Runs Vitest tests</td>
    </tr>
        <tr>
        <td>test:ui:dev</td>
        <td>Runs Cypress integration tests</td>
    </tbody>
</table>

## ENV vars

You simply have to set the URL from the API you want to use, in this case we're using: 
VITE_SERVER_URL=https://crud-clubs-api.onrender.com`

```
## Folder structure

    ├── cypress                 # Cypress tests
    ├── src                     # Source files
        ├── assets              # Images, icons
        ├── lib                 # Utilities
            ├── application     # Where the core logic remains
            ├── components      # Components like TeamModal or AlertModal
            ├── entities        # Entities like interfaces or main classes
            ├── helpers         # Helpers like clickOutside event helper
            ├── mappers         # Mappers
            ├── services        # Service of crud-clubs-aṕi
            ├── storage         # Local storage functionality
            ├── store           # Store svelte vars used globaly inthe application
        ├── routes              # Routes components
   
