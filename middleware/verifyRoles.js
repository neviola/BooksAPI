// anononymus middleware function inside like this allws multiple params to be passed in

const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req?.roles) return res.sendStatus(401);  // we should have roles cause verifyJWT middleware is before this
        const rolesArray = [...allowedRoles];
        
        // za usporedbu
        console.log(rolesArray);
        console.log(req.roles);
        // .map creates new array, each role in req.roles compared to rolesArray - true/false array -> .find one true value
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val===true);
        if (!result) return res.sendStatus(401);  // if no true values, the req.roles doesnt have access to route
        next();
    }
}

module.exports = verifyRoles;

// add this to books api routes