const { MongoClient, ObjectId } = require('mongodb');

const getConnectedClient = async () => {
    const client = new MongoClient(process.env.ATLAS_CONNECTION, {
        useNewUrlParser: true, useUnifiedTopology: true
    });
    return await client.connect()
}

const getMoviesCollection = async (client) => {
    return await client.db('crud-project').collection('Movies');
}

const getMovies = async () => {
    const client = await getConnectedClient()


    try {
        const collection = await getMoviesCollection(client)
        return await collection.find().toArray()
    } finally {
        await client.close();

    }
}

const createMovie = async (movie) => {
    const client = await getConnectedClient()

    try {
        const collection = await getMoviesCollection(client)
        await collection.insertOne(movie)
    } finally {
        client.close()
    }
}

const updateMovie = async (movie) => {
    const client = await getConnectedClient()
    const { _id, ...movieToSave } = movie

    try {
        const collection = await getMoviesCollection(client)
        await collection.updateOne({ _id: ObjectId(movie._id) }, {
            $set: movieToSave
        })
    } finally {
        client.close()
    }
}

const deleteMovie = async (movieId) => {
    const client = await getConnectedClient();

    try {
        const collection = await getMoviesCollection(client)
        await collection.deleteOne({ _id: ObjectId(movieId) })
    } finally {
        client.close()
    }
}

module.exports = { getMovies, createMovie, updateMovie, deleteMovie }

