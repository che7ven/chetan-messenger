# chat-with-chevy

Simple chat bot using React, NodeJS and Socket.io

## Available Scripts

### Running Client (UI): In the project directory, you can:

> `cd client`

> `nvm use` (setting node version)

> `npm install`

> `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

NOTE: If you are facing error during app start, add .env file with `SKIP_PREFLIGHT_CHECK=true` content inside client folder.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run cy:open`

Launches the cypress test runner in the interactive watch mode.

### `npm run storybook`

Launches the storybook references.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### Running Server (Socket.io API): In the project directory, you can:

> `cd server`

> `nvm use` (setting node version)

> `npm install`

> `npm start`
