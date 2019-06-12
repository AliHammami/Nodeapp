 exports.postValidator = (req, res, next) => {
     req.check("title", "A title is required")
     .isLength({
         min: 1,
         max: 30,
     })
     .withMessage("Title must be between 1 to 30 characters")
     req.check("body", "A body is required")
     .isLength({
        min: 4,
        max: 2000,
     })
     .withMessage("Body must be between 4 to 2000 characters")

    const errors = req.validationErrors();

    if(errors){
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError}),
        console.log('ERROR', errors)
    }

    next();
 }
 
 exports.registerValidator = (req, res, next) => {
    req.check("username", "username is required").notEmpty();
    req.check("email", "Email must be between 4 to 2000 characters").notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min: 4,
        max: 2000,
    })
    req.check("password", "password is required").notEmpty();
    req.check("password")
    .isLength({
        min: 6,
    })
    .withMessage("password required at leat 6 characters")
    .matches(/\d/)
    .withMessage("password required at least one number")
    .matches(/[a-zA-Z]/)
    .withMessage("password required at least one letter")

    const errors = req.validationErrors();

    if(errors){
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError}),
        console.log('ERROR', errors)
    }

    next();
}