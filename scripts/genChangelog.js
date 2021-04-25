const fs = require('fs');
const path = require('path');
const execa = require('execa');

async function genNewRelease () {
  const nextVersion = require('../lerna.json').version;
  const { stdout, } = await execa(require.resolve('lerna-changelog/bin/cli'), [
    '--next-version',
    nextVersion,
  ]);
  return stdout;
}

const gen = (module.exports = async () => {
  let newRelease = await genNewRelease();
  const changelogPath = path.resolve(__dirname, '../CHANGELOG.md');

  if (newRelease) {
    newRelease = newRelease + '\n\n\n';
  }

  const newChangelog =
    newRelease + fs.readFileSync(changelogPath, { encoding: 'utf8', });
  fs.writeFileSync(changelogPath, newChangelog);

  delete process.env.PREFIX;
});

if (require.main === module) {
  gen().catch(err => {
    console.error(err);
    process.exit(1);
  });
}