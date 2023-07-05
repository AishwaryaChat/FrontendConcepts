// The Singleton Design Pattern
// The singleton pattern only allows a class or object to have a single instance and it uses a global variable to store that instance. 

class Logger {
    constructor() {
        this.logger = []
    }
    addLogs(log) {
        this.logger.push(log)
    }
}


class LoggerSingleton {
    constructor() {
        if(!LoggerSingleton.instance) {
            LoggerSingleton.instance = new Logger()
        }
        return LoggerSingleton.instance
    }
}

const logger = new LoggerSingleton()
const logger2 = new LoggerSingleton()
console.log("both are equal", logger === logger2) // true
logger.addLogs("23")
logger2.addLogs("100")
console.log("Logger", LoggerSingleton)