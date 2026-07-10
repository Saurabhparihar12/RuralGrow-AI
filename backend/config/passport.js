import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { userService } from '../data/dbHelper.js';

export const configurePassport = () => {
  const clientID = process.env.GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID_PLACEHOLDER';
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || 'GOOGLE_CLIENT_SECRET_PLACEHOLDER';

  passport.use(new GoogleStrategy({
    clientID,
    clientSecret,
    callbackURL: 'http://localhost:5000/api/auth/google/callback',
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : '';
      const name = profile.displayName || 'Google User';
      const avatar = profile.photos && profile.photos[0] ? profile.photos[0].value : null;
      const googleId = profile.id;

      if (!email) {
        return done(new Error('Google OAuth failed: profile has no email'), null);
      }

      // Look up user by Google ID first
      let user = await userService.findUserByGoogleId(googleId);

      // If not found, look up by email address
      if (!user) {
        user = await userService.findUserByEmail(email);
        if (user) {
          // Link Google ID to this existing email profile
          user.googleId = googleId;
          if (avatar && !user.avatar) user.avatar = avatar;
        }
      }

      // Create new user record if they do not exist
      if (!user) {
        user = await userService.createUser({
          name,
          email,
          role: 'guest', // default role
          googleId,
          avatar,
          shopName: 'Garhwal Farms (Google)'
        });
      }

      return done(null, user);
    } catch (err) {
      console.error('[Passport Google Strategy] Auth error:', err.message);
      return done(err, null);
    }
  }));
};
