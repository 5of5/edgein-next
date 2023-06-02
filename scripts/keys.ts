import fs from 'fs';
const fsPromises = fs.promises;

const ignoreList: string[] = []; // ['tickers', 'market_data']

const objectDeepKeys = (
  obj: Record<string, any>,
  keys: Record<string, number | string> = {},
  parentPath = '',
) => {
  for (const key of Object.keys(obj)) {
    if (ignoreList.includes(key)) {
      return;
    }
    const path = `${parentPath ? `${parentPath}.` : ''}${key}`;
    if (!Array.isArray(obj)) {
      if (!(path in keys)) {
        keys[path] = 0;
      }
      keys[path] = (keys[path] as number) + 1;
    }
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      if (Array.isArray(obj)) {
        objectDeepKeys(obj[parseInt(key)], keys, parentPath);
      } else {
        objectDeepKeys(obj[key], keys, path);
      }
    }
  }
  return keys;
};

async function readFiles(
  dirname: string,
  onFileContent: (filename: string, content: string) => void,
) {
  const filenames = await fsPromises.readdir(dirname);
  for (let i = 0; i < filenames.length; i++) {
    const filename = filenames[i];
    const content = await fsPromises.readFile(dirname + filename, 'utf-8');
    onFileContent(filename, content);
  }
}

async function main() {
  const keys: Record<string, number | string> = {};
  await readFiles('../../coin_details/', (filename, content) => {
    try {
      const parsed = JSON.parse(content);
      objectDeepKeys(parsed, keys);
    } catch (err) {
      console.log('Error parsing', filename, err);
    }
  });
  const sortable: any[] = [];
  for (const val in keys) {
    sortable.push([val, keys[val]]);
  }

  sortable.sort(function (a: any, b: any) {
    return b[1] - a[1];
  });
  sortable.map(i => console.log(i[0], i[1]));
}
main();
