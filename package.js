const package = {
  "name": "restful_api_using_node_mongodb_and_typescript",
  "version": "0.0.1",
  "description": "RESTful API using Node, MongoDB & TypeScript",
  "main": "src/server.ts",
  "scripts": {
    "build": "rm -rf build/ && tsc",
    "start": "node build/server.js",
    "server:dev": "nodemon --exec ./node_modules/.bin/ts-node src/server.ts",
    "test": "test --coverage"
  },
  "author": "Chris Johannesson",
  "license": "MIT",
  "devDependencies": {
    "@types/express": "^4.17.13", /* This package contains type definitions for Express (http://expressjs.com). */
    "nodemon": "^2.0.16",         /* nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected. */
    "ts-node": "^10.8.1",         /* TypeScript execution and REPL for node.js, with source map and native ESM support. */
    "typescript": "^4.7.3"        /* TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications. */
  },
  "dependencies": {
    "chalk": "^5.0.1",      /* For adding color to console output. Use 4.1.2 for CommonJS projects since later versions are ESM only*/
    "dotenv": "^16.0.1",    /* To be able to read environmental variables from the .env file. */
    "express": "^4.18.1",   /* Server package for Node.js to help build the RESTful API */
    "joi": "^17.6.0",       /* The most powerful schema description language and data validator for JavaScript. */
    "mongoose": "^6.3.8"    /* Wrapper package for connecting to MongoDB */
  }
}
