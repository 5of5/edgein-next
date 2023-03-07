import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { getClient } from "./postgres_helpers";

const onMigrateLocationJson = async (resourceType: string) => {
  const client = await getClient();

  let successfullyLocations = [];
  let notFoundLocations = [];
  let lackInfoLocations = [];
  let errorLocations = [];

  const queryResults = await client.query(
    `SELECT id, name, location FROM ${resourceType} WHERE location <> ''`
  );

  for (let i = 0; i < queryResults.rows.length; i += 1) {
    const record = queryResults.rows[i];
    if (record.location) {
      console.log(
        `Migrate record record #${record.id} ${record.name} ${record.location}`
      );

      try {
        const response = await axios.get(
          `https://api.radar.io/v1/geocode/forward?query=${encodeURI(
            record.location
          )}`,
          {
            headers: {
              Authorization: process.env.RADAR_API_KEY ?? "",
            },
          }
        );

        const addressDetail = response.data.addresses[0];
        if (!addressDetail) {
          notFoundLocations.push(record.id);
        } else {
          const { addressLabel, city, state, country, latitude, longitude } =
            addressDetail;
          if (!addressLabel || !city || !state || !country) {
            lackInfoLocations.push(record.id);
          } else {
            successfullyLocations.push(record.id);
            await client.query(
              `UPDATE ${resourceType} SET location_json=\$\${"address":"${addressLabel}", "city":"${city}", "state":"${state}", "country":"${country}"}\$\$::jsonb, geopoint='POINT(${latitude} ${longitude})' WHERE id=${record.id};`
            );
          }
        }
      } catch (error) {
        console.log(record.id, record.name, record.location, error);
        errorLocations.push(record.id);
      }
    }
  }

  console.log("======================================");
  console.log(
    `Migrate ${resourceType} successfully`,
    successfullyLocations.length
  );
  console.log(`${resourceType} Ids`, successfullyLocations);

  console.log("======================================");
  console.log(`Not found ${resourceType} locations`, notFoundLocations.length);
  console.log(`${resourceType} Ids`, notFoundLocations);

  console.log("======================================");
  console.log(
    `Lack ${resourceType} information locations`,
    lackInfoLocations.length
  );
  console.log(`${resourceType} Ids`, lackInfoLocations);

  console.log("======================================");
  console.log(`Migrate ${resourceType} failed`, errorLocations.length);
  console.log(`${resourceType} Ids`, errorLocations);

  await client.end();
};

const run = async () => {
  await onMigrateLocationJson("vc_firms");
};

run();
