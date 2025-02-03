const Joi = require('joi')

const validationSignup = (req,res,next)=>{
      const schema = Joi.object({
            name: Joi.string().min(3).required(),
            email: Joi.string().email().required(),
            password:Joi.string().min(6).required(),
            // isadmin:Joi.boolean().optional()
      })

      const {error} = schema.validate(req.body);
      if(error){
        return res.status(400).json({message: error})
      }
      next();
    }

const validationLogin = (req,res,next)=>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password:Joi.string().min(6).required()
    })
    const {error} = schema.validate(req.body);
      if(error){
        return res.status(400).json({message: error.details[0].message}) //updated
      }
      next();
}

module.exports = {validationSignup,validationLogin}