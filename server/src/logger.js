import path from 'path';
import winston from 'winston';

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            format: winston.format.json(), //format.combine(format.timestamp(), loggerFormat),
            filename: path.join(__dirname, '../', 'logs', 'combined.log'),
        }),
    ],
});

export default logger;
