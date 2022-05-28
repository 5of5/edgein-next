
import type { NextApiRequest, NextApiResponse } from 'next'
import Airtable from 'airtable'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()
  
  var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE || '');
  base('email_attempts').create([
    {
      "fields": {
        "email": req.body.email,
        "date": new Date().toISOString(),
      }
    },
  ], function(err: Airtable.Error, records?: Airtable.Records<Airtable.FieldSet>) {
    if (err) {
      console.error(err);
    }
    res.end()
  });
    
}

export default handler