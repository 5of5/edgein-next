var fs = require('fs');
const fsPromises = fs.promises;

const ignoreList = [] // ['tickers', 'market_data']

const objectDeepKeys = (obj: Record<string, any>, keys: Record<string, number | string> = {}, parentPath: string = '') => {
  for (const key of Object.keys(obj)) {
    if (ignoreList.includes(key)) {
      return;
    }
    const path = `${parentPath ? `${parentPath}.` : ''}${key}`
    if (!Array.isArray(obj)) {
      if (!(path in keys)) {
        keys[path] = 0
      }
      keys[path] = (keys[path] as number) + 1
    }
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      if (Array.isArray(obj)) {
        objectDeepKeys(obj[key], keys, parentPath)
      } else {
        objectDeepKeys(obj[key], keys, path)
      }
  
    }
  }
  return keys
}

async function readFiles(dirname, onFileContent) {
  const filenames = await fsPromises.readdir(dirname)
  for (var i = 0; i < filenames.length; i++) {
    const filename = filenames[i]
    const content = await fsPromises.readFile(dirname + filename, 'utf-8')
    onFileContent(filename, content);
  }
}

async function main() {
  const keys: Record<string, number | string> = {}
  await readFiles('../../coin_details/', (filename, content) => {
    try {
      const parsed = JSON.parse(content)
      objectDeepKeys(parsed, keys)
    } catch (err) {
      console.log('Error parsing', filename, err)
    }
  })
  let sortable = [];
  for (var val in keys) {
      sortable.push([val, keys[val]]);
  }

  sortable.sort(function(a, b) {
      return b[1] - a[1];
  });
  sortable.map(i => console.log(i[0], i[1]))

}
main()