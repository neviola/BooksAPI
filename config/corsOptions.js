
const allowedOrigins = require('./allowedOrigins');                  // domains that will acces this backend node server

const corsOptions = {
    origin: (origin, callback) => {
       
        // ako je u allowedOriginsi, || !origin-> ako nema origin da se moze tijekom evelopmenta korisit inace not allow by cors, treba maknut to nakon developmenta
        
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)                 // null - no error, true - origin will be sent back -"yes that the same origin it is allowed"
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;