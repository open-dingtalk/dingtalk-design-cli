const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const packagesPath = path.join(__dirname, '../packages');
const subDirNames = fs.readdirSync(packagesPath);
console.log('packages start building...');

subDirNames.filter(v=>!v.startsWith('.')).forEach((subDirName)=>{
  const subDirPath = path.join(packagesPath, subDirName);
  try {
    cp.execSync(`cd ${subDirPath} && npm run build`);
    console.log(`${subDirName} build success.`);
  } catch(e) {
    console.log(`${subDirName} build fail.`, e);
  }
});

console.log('packages end building.');