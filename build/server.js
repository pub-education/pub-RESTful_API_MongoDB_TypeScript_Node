"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const Author_1 = __importDefault(require("./routes/Author"));
const Book_1 = __importDefault(require("./routes/Book"));
const router = (0, express_1.default)();
/** Server */
const startServer = () => {
    router.use((req, res, next) => {
        /** Log the Request */
        Logging_1.default.info(`Incomming -> Method: [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        /** Log the Response */
        res.on('finish', () => {
            Logging_1.default.info(`Outgoing -> Method: [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        // Calling next() allows us to pass through
        // this piece of middleware instead of stopping here.
        next();
    });
    /** Only accept JSON requests and extended means several layers are OK. */
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'Options') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    /** Routes */
    router.use('/authors', Author_1.default);
    router.use('/books', Book_1.default);
    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));
    /** Error Handling */
    router.use((req, res, next) => {
        const error = new Error('not found');
        Logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => Logging_1.default.info(`Server is running on port ${config_1.config.server.port}.`));
};
/** Connect to MongoDB Atlas */
mongoose_1.default
    .connect(config_1.config.mongo.url, {
    retryWrites: true,
    w: 'majority',
})
    .then((data) => {
    Logging_1.default.info('Connected to MongoDB');
    startServer();
})
    .catch((err) => {
    Logging_1.default.error('Unable to connect');
    Logging_1.default.error(err);
});
