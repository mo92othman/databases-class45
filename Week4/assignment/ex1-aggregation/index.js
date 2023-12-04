import {
  getTotalPopulationByYear,
  getContinentInfoByYearAndAge,
} from './functions.js';

async function run() {
  try {
    // Call your functions and log the results
    const totalPopulationResult = await getTotalPopulationByYear('Netherlands');
    console.log('Total Population by Year:');
    console.log(totalPopulationResult);

    const continentInfoResult = await getContinentInfoByYearAndAge(
      2020,
      '100+',
    );
    console.log('Continent Info by Year and Age:');
    console.log(continentInfoResult);
  } catch (error) {
    console.error('Error:', error);
  }
}

run();
