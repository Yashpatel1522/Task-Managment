const passport=require('passport');
const database = require('../helpers/database.helper');
const JwtStrategy=require('passport-jwt').Strategy;
// const jwtExtract=require('passport-jwt').ExtractJwt;

const getToken=(req)=>{
  // console.log(req)
  return req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer","")||null;
}

let output={
  jwtFromRequest:getToken,
  secretOrKey:process.env.SECRET_KEY
}
passport.use(new JwtStrategy(output, async function(jwt_payload, done){
  try {
      let db=new database()
      let user = await db.executeQuery('select * from users where id = ?',[jwt_payload.id]);
      console.log(user)
      if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
} catch (error) {
    return done(err);
}

}));
module.exports=passport;