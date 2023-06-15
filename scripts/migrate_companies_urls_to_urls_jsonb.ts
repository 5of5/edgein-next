import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { getClient } from './postgres-helpers';

(async () => {
  const client = await getClient();

  const queryResults = await client.query(
    'SELECT id, name, github, website, careers_page, company_linkedin, white_paper, audit_file, twitter, discord, glassdoor, bitcointalk, facebook, instagram, medium, reddit, telegram, youtube, blockchain_explorer FROM companies',
  );

  for (let i = 0; i < queryResults.rows.length; i += 1) {
    const record = queryResults.rows[i];

    console.log(
      `Update urls column for data row id ${record.id} name ${record.name}`,
    );

    const urls = {
      github: record.github,
      website: record.website,
      careers_page: record.careers_page,
      company_linkedin: record.company_linkedin,
      white_paper: record.white_paper,
      audit_file: record.audit_file,
      twitter: record.twitter,
      discord: record.discord,
      glassdoor: record.glassdoor,
      bitcointalk: record.bitcointalk,
      facebook: record.facebook,
      instagram: record.instagram,
      medium: record.medium,
      reddit: record.reddit,
      telegram: record.telegram,
      youtube: record.youtube,
      blockchain_explorer: record.blockchain_explorer,
    };

    await client.query('UPDATE companies SET urls = $1 WHERE id = $2', [
      urls,
      record.id,
    ]);
  }

  await client.end();
})();
