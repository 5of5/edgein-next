
import Airtable from 'airtable'

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY
});
const base = Airtable.base(process.env.AIRTABLE_BASE ?? "");

export const getAirtableTable = (baseName) => {
  const array = []
  return new Promise<Record<string, any>[]>((resolve) => {
    base(baseName).select({
      // Selecting the first 3 records in Grid view:
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
    
      records.forEach(function(record) {
        array.push({...record.fields, _recordId: record.id })
      });
    
      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
    
    }, function done(err) {
      resolve(array)
    });  
  })
}

export const updateAirtable = async (baseName, records) => {
  const updateChunk = (chunk) => {
    return new Promise(resolve => {
      base(baseName).update(chunk, function(err, records) {
        if (err) {
          console.error(err);
          resolve(false)
          return;
        }
        console.log('Updated', records.length)
        // records.forEach(function (record) {
        //   console.log(record.getId());
        // });
        resolve(true)
      });
    });
  }
  async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
  }
  const chunkSize = 10;
  for (let i = 0; i < records.length; i += chunkSize) {
    console.log('sending', i)
    await updateChunk(records.slice(i, i + chunkSize))
    await sleep(250);
  }
}
