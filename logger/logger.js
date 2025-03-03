const winston = require('winston')
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
	level: 'info',
	format: combine(timestamp(), json()),
	transports: [
		new winston.transports.File({ filename: "./logger/logger-log.log" })
	],
})

module.exports = logger