const fs = require('fs');
const { execSync } = require('child_process');

const gitSha = execSync('git rev-parse --short HEAD').toString().trim();
const gitBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const buildTime = new Date().toISOString();

const versionInfo = {
  sha: gitSha,
  branch: gitBranch,
  buildTime: buildTime
};

fs.writeFileSync('src/app/version.ts', `export const VERSION = ${JSON.stringify(versionInfo)};`);
console.log('✓ Version file generated:', versionInfo);
