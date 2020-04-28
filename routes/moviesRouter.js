const express = require('express');
const DataAccessLayer = require('./DataAccess/DataAccessLayer')
const router = express.Router();

const isValidMovie = (movie) => {

    const hasValidTitle = !!movie.movieTitle
    const hasValidProducer = !!movie.producedBy
    const hasValidDirector = !!movie.directedBy
    const hasValidLeadActors = !!movie.leadActors
    const hasValidReleaseDate = !!movie.releaseDate
    const hasValidRunTime = !!movie.runTime

    return hasValidTitle && hasValidProducer && hasValidDirector && hasValidLeadActors && hasValidReleaseDate && hasValidRunTime
}

router.get('/', async (req, res) => {
    const movies = await DataAccessLayer.getMovies()

    res.send(movies)
})

router.post('/', async (req, res) => {
    const movie = req.body

    if (isValidMovie(movie)) {
        await DataAccessLayer.createMovie(movie)
        res.status(201).send(movie)
    }
    else {
        res.status(400).send({
            hasValidTitle,
            hasValidProducer,
            hasValidDirector,
            hasValidLeadActors,
            hasValidReleaseDate,
            hasValidRunTime,
            message: 'Movie needs a title, producer, director(s), lead actors, release date, and run time'
        })
    }
})

router.put('/', async (req, res) => {
    const movie = req.body

    if (isValidMovie(movie)) {
        await DataAccessLayer.updateMovie(movie)
        res.status(200).send(movie)
    }
    else {
        res.status(400).send({
            hasValidTitle,
            hasValidProducer,
            hasValidDirector,
            hasValidLeadActors,
            hasValidReleaseDate,
            hasValidRunTime,
            message: 'Movie needs a title, producer, director(s), lead actors, release date, and run time'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const movieId = req.params.id

    await DataAccessLayer.deleteMovie(movieId)

    res.send(movieId)
})

module.exports = router;