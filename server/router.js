import {signup, signin} from './controllers/authentication';
import passportService from './services/passport';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

export default (app) => {
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'Super secret code is ABC123'});
  })
  app.post('/signin', requireSignin, signin);
  app.post('/signup', signup);
}
