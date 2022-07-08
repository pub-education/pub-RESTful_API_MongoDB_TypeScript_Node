import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';

const router = express();

/** Server */
const startServer = () => {
  router.use((req, res, next) => {
    /** Log the Request */
    Logging.info(`Incomming -> Method: [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    /** Log the Response */
    res.on('finish', () => {
      Logging.info(`Incomming -> Method: [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
    });

    // Calling next() allows us to pass through
    // this piece of middleware instead of stopping here.
    next();
  });

  /** Only accept JSON requests and extended means several layers are OK. */
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

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

  /** Healthcheck */
  router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

  /** Error Handling */
  router.use((req, res, next) => {
    const error = new Error('not found');
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running ono port ${config.server.port}.`));
};

/** Connect to MongoDB Atlas */
mongoose
  .connect(config.mongo.url, {
    retryWrites: true,
    w: 'majority',
  })
  .then((data) => {
    Logging.info('Connected to MongoDB');
    startServer();
  })
  .catch((err) => {
    Logging.error('Unable to connect');
    Logging.error(err);
  });
