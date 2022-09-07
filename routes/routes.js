import express from 'express';
import passport from 'passport';
import passportLocal from "passport-local";
import { validateLogin, validateRegister, validateSearch, validationRulesLogin, validationRulesRegister, validationRulesSearch } from "./validator.js";

import { addSavedDeal, addSavedSearch, authUser, createUser, deleteSavedDeal, deleteSavedSearch, deserialize, getDeals, getSearches } from '../queries.js';

import { callDealsAPI } from '../util/callDealsAPI.js';

export const router = express.Router();

const LocalStrategy = passportLocal.Strategy;

router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(authUser));

passport.serializeUser((user, done) => {
  console.log("serialize user")
  console.log(user)
  done(null, user.user_id);
});

passport.deserializeUser(deserialize);

router.post("/login",  validationRulesLogin(), validateLogin, passport.authenticate('local'), (req, res) => {
  res.status(200).send(req.user)
})

router.post('/register', validationRulesRegister(), validateRegister, createUser)

router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    console.log('logged out!')
  res.send('user successfully logged out')
  });
});

// get results
router.get('/results', validationRulesSearch(), validateSearch, async (req, res) => {
  const response = await callDealsAPI(req.query);
  if(response.statusCode===404){
    res.status(response.statusCode).send({errorMessage: response.message})
  }else{
    console.log('user making a search (req.query, req.user, req.session)');
    console.log(req.query);
    console.log(req.user)
    console.log(req.session)
    res.json(response)
  }
})

// add savedSearch
router.post('/searches', addSavedSearch);

// add savedDeal
router.post('/deal', addSavedDeal);

 // get savedSearches
router.get('/searches', getSearches);

// get savedDeals
router.get('/deals', getDeals)

// delete savedSearch
router.delete('/searches/:search_id', deleteSavedSearch);

// delete savedSearch
router.delete('/deals/:deal_id', deleteSavedDeal);

