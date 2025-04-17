require('dotenv').config();
const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');

const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;
const FILE_PATH = './Eventbrite.xlsx.csv';
const BATCH_SIZE = 50;

const mutation = `
  mutation InsertEvents($objects: [events_insert_input!]!) {
    insert_events(objects: $objects) {
      affected_rows
    }
  }
`;

function formatEvent(row) {
  const start = new Date(`${row['Start Date']} ${row['Start Time']}`);
  const end = new Date(`${row['End Date']} ${row['End Time']}`);

  return {
    name: row['Name'],
    link: row['URL'],
    start_date: start.toISOString().split('T')[0],
    start_time: start.toISOString().split('T')[1].slice(0, 8),
    end_date: end.toISOString().split('T')[0],
    end_time: end.toISOString().split('T')[1].slice(0, 8),
    timezone: row['Time Zone'],
    overview: row['Summary'],
    price: row['Min Price'] || '',
    notes: row['Organizer Summary'] || '',
    twitter: row['Twitter'] || '',
    facebook: row['Facebook'] || '',
    venue_name: row['Organizer'] || '',
    location_json: {
      address: row['Venue Address'],
      city: row['City'],
      region: row['Region'],
      zip: row['Zip'],
      country: row['Country'],
    },
    geopoint: {
      lat: parseFloat(row['Latitude']),
      lng: parseFloat(row['Longitude']),
    },
    id: parseInt(row['Event ID']) || null,
    status: 'active', // You might want to set this based on dates or other criteria
    language: row['Language'] || 'en',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

async function insertBatch(records) {
  try {
    const response = await axios.post(
      HASURA_ENDPOINT,
      {
        query: mutation,
        variables: { objects: records },
      },
      {
        headers: {
          'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
        },
      },
    );
    console.log(
      `✅ Inserted ${response.data.data.insert_events.affected_rows} events`,
    );
  } catch (error) {
    console.error(
      '❌ Error inserting batch:',
      error.response?.data || error.message,
    );
  }
}

(async () => {
  const batch = [];
  const stream = fs.createReadStream(FILE_PATH).pipe(csv());

  for await (const row of stream) {
    try {
      const event = formatEvent(row);
      batch.push(event);

      if (batch.length >= BATCH_SIZE) {
        await insertBatch(batch.splice(0, BATCH_SIZE));
      }
    } catch (e) {
      console.warn('⚠️ Skipping row due to format error:', e.message);
    }
  }

  if (batch.length) {
    await insertBatch(batch);
  }

  console.log('🎉 Finished ingesting events');
})();
