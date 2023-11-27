const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const { seedDatabase } = require('./seedDatabase.js');

async function createEpisodeExercise(client) {
  const newEpisode = {
    episode: 'S09E13',
    title: '"EBONY SUNSET"',
    elements: [
      'CIRRUS',
      'CLOUDS',
      'CONIFER',
      'DECIDIOUS',
      'GRASS',
      'MOUNTAIN',
      'MOUNTAINS',
      'RIVER',
      'SNOWY_MOUNTAIN',
      'TREE',
      'TREES',
    ],
  };

  // Add the missing episode to the collection
  const result = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .insertOne(newEpisode);

  console.log(
    `Created season 9 episode 13 and the document got the id ${result.insertedId}`,
  );
}

async function findEpisodesExercises(client) {
  // Find the title of episode 2 in season 2
  const episode2Title = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .findOne({ episode: 'S02E02' })
    .then((result) => result.title);

  console.log(`The title of episode 2 in season 2 is ${episode2Title}`);

  // Find the season and episode number of the episode called "BLACK RIVER"
  const blackRiverInfo = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .findOne({ title: 'BLACK RIVER' });

  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${blackRiverInfo.episode}`,
  );

  // Find all of the episode titles where Bob Ross painted a CLIFF
  const cliffEpisodes = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .find({ elements: 'CLIFF' })
    .toArray();

  console.log(
    `The episodes that Bob Ross painted a CLIFF are ${cliffEpisodes
      .map((episode) => episode.title)
      .join(', ')}`,
  );

  // Find all of the episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE
  const cliffAndLighthouseEpisodes = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .find({ elements: { $all: ['CLIFF', 'LIGHTHOUSE'] } })
    .toArray();

  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${cliffAndLighthouseEpisodes
      .map((episode) => episode.title)
      .join(', ')}`,
  );
}

async function updateEpisodeExercises(client) {
  // Update the title of episode 13 in season 30 to BLUE RIDGE FALLS
  const updateResultTitle = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .updateOne({ episode: 'S30E13' }, { $set: { title: 'BLUE RIDGE FALLS' } });

  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${updateResultTitle.modifiedCount} episodes`,
  );

  // Update 'BUSHES' to 'BUSH' in the elements array of all documents
  const updateResultBushes = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .updateMany({ elements: 'BUSHES' }, { $set: { 'elements.$': 'BUSH' } });

  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${updateResultBushes.modifiedCount} episodes`,
  );
}

async function deleteEpisodeExercise(client) {
  // Delete episode 14 in season 31
  const deleteResult = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .deleteOne({ episode: 'S31E14' });

  console.log(
    `Ran a command to delete episode and it deleted ${deleteResult.deletedCount} episodes`,
  );
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`,
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();
