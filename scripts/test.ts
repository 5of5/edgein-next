async function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}
const process1 = async () => {
  for (var i = 0; i < 10; i++) {
    process.stdout.write(`Sending ${i} \r`)
    await sleep(250);
  }
}
process1()