const express = require('express');
const getLyrics = require('lyric-get').get;
const router = new express.Router();

module.exports = router;

router.get('/:artist/:song', (req, res, next) => {
    console.log('FROM THE SERVER!! ROUTER GET!!')
    getLyrics(req.params.artist, req.params.song, (err, r) => {
        if (err) return next(err);
        res.send({ lyric: r });
    });
});