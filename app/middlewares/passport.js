const { User } = require("../user/models/user");
const { Strategy, ExtractJwt } = require("passport-jwt");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "somethingSomething",
};
module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      console.log("payload", payload);
      try {
        const user = await User.findById(payload.user_id);
        if (user) {
          return done(null, user);
          //appending the user details to req object
        }
        return done(null, false);
      } catch (error) {
        //res: unauthorized
        //console.log(error);
        return done(null, false);
      }
    })
  );
};
