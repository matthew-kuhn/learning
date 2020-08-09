const grab = flag => {
  let indexAfterFlag = process.argv.indexOf(flag) +1;
  return process.argv[indexAfterFlag];
}

const firstName = grab('--first')
const lastName = grab('--last')

console.log(`${firstName} ${lastName}`);
