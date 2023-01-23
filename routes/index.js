const express = require('express');
const navigation = express.Router();

const {ensureAuthenticated, checkUserGroups} = require('../middleware/authorize');

navigation.get('/', ensureAuthenticated, checkUserGroups, (req, res) => {
    res.render('pages/index')
})
navigation.get('/login', (req, res) => {
    res.render('pages/login', {error: null})
})
navigation.get('/register', (req, res) => {
    res.render('pages/register')
})


navigation.get('/logout', (req, res) => {
    try {
        req.session.user = null;
        req.session.access_token = null;
        res.redirect('/')
    } catch(err) {
        res.status(500).send({error: 'internal server error'})
    }
})

module.exports = navigation;