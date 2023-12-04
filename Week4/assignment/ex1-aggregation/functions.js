import { connectToDatabase, closeConnection } from './connect.js';

export const getTotalPopulationByYear = async (countryName) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('countries');

    const pipeline = [
      // Define the pipeline
      {
        $match: { Country: countryName },
      },
      {
        $group: {
          _id: '$Year',
          countPopulation: {
            $sum: { $add: ['$M', '$F'] },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];

    const result = await collection.aggregate(pipeline).toArray();
    return result;
  } catch (error) {
    console.error('Error retrieving total population');
    throw error;
  } finally {
    closeConnection();
  }
};

export const getContinentInfoByYearAndAge = async (year, age) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('countries');

    const pipeline = [
      // Define the pipeline
      {
        $match: {
          $and: [
            {
              Country: {
                $in: [
                  'AFRICA',
                  'ASIA',
                  'EUROPE',
                  'LATIN AMERICA AND THE CARIBBEAN',
                  'NORTHERN AMERICA',
                  'OCEANIA',
                ],
              },
            },
            { Age: age },
            { Year: year },
          ],
        },
      },
      {
        $addFields: {
          TotalPopulation: {
            $add: ['$M', '$F'],
          },
        },
      },
      { $sort: { Country: 1 } },
    ];

    const result = await collection.aggregate(pipeline).toArray();
    return result;
  } catch (error) {
    console.error('Error retrieving continent info');
    throw error;
  } finally {
    closeConnection();
  }
};
