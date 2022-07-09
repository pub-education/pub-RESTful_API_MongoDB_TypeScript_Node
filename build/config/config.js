"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
/**
 * Loads any environment variables we have in our batchrc file
 * inside our current environment or in our .env file in our root directory.
 *  */
dotenv_1.default.config();
// Using the "|| ''" to tell typescript it is a string and provide an empty string
//  if something goes wrong.
const MONGO_URL = process.env.MONGO_DB_CONNECTION || '';
const SERVER_PORT = process.env.PORT || 3009;
exports.config = {
    mongo: {
        url: MONGO_URL,
    },
    server: {
        port: SERVER_PORT,
    },
};
