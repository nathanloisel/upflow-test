# Notes
A table of generated paraglinders data.

  - Handles 100,000s of rows.
  - Generic, re-usable API that abstracts away the underlying implementation. (GraphQL)
  - Light backend that serves up the data.
  - Allow sorting by clicking on columns.
  - No 3rd party data grid library.
  - Auto-sizes columns based on cell content. (HTML table do it natively)
  - Resizable columns
  - Edit cell content: with custom input (slider for number, select for enums...)
  - Ability to delete rows
  - Tests (only visual test with storybook for frontend and some basic tests on the backend with jest: not enough time to do more)

## API
  ### Libs
  - GraphQL (Apollo)
  - Express
  - Typescript
  - knex

  ### Data generation:
  ```cd api && npm run data:gen```
  ### Feature
  - Edit data
  - Pagination

  ### Testing
  ```npm run test```

  ### Playground
Test the GraphQL endpoint with the builtin playground : ```http://localhost:8080/graphql```

## UI
I didn't feel necessary to spend time on styling, it is not the most technical part of the projet.
  ### Libs
  - Zero build config manager: razzle
  - module bundler: webpack
  - compiler: swc
  - Typescript
  - UI lib: React
  - Comm lib: Apollo
  - Style lib: styled-components
  - react-helmer
  - react-popper
  - react-loader
  - react-rangeslider
  
  ### Feature
  - A table with data
  - Pagination
  - Sort data
  - resize columns
  - Edit table cell on click

  ### Testing
  ```npm run storybook```

  
## Infrastructure
Infrastructure is available in the [docker-compose file](./docker-compose.yml) and composed as follow:
 - a NodeJs GraphQL micro-service ([api](./api)) 
 - a PostgreSQL database
 - a frontend react app ([ui](./ui))
### Installation
```docker network create dev```
### Execute
```docker compose up```
### Known bugs
 - React application hot reloading with docker doesn't work on windows due to file events that are not sent to the container. Run npm run start into ui folder.

# Installation
  - Generate data
  ```cd api && npm i && npm run data:gen```
  - Run server and db
  ```cd .. && docker compose up```
  - Run frontend
  ```cd ui && npm i && npm start```
  - Go to
  ```http://localhost:3000```
