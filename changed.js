// const util = require("util");
// const exec = util.promisify(require('child_process').exec);
// const execSync = require("child_process").execSync;

const shell = require("shelljs");

function getChanged() {
  try {
    GIT_LATEST_TAG_COMMAND = "git describe origin/main";
    const { stdout: GIT_LATEST_TAG } = shell.exec(GIT_LATEST_TAG_COMMAND, {
      silent: true,
    });
    // console.log(GIT_LATEST_TAG.trim(), "GIT_LATEST_TAG");

    GIT_BRANCH_COMMAND = "git rev-parse --abbrev-ref HEAD";
    const { stdout: GIT_BRANCH } = shell.exec(GIT_BRANCH_COMMAND, {
      silent: true,
    });
    console.log("GIT_BRANCH", GIT_BRANCH.trim());

    const COMMIT_HASH = `git merge-base ${GIT_BRANCH.trim()}  ${GIT_LATEST_TAG.trim()}`;
    console.log(COMMIT_HASH);
    const { stdout: LAST_HASH } = shell.exec(COMMIT_HASH, {
      silent: true,
    });
    console.log("LAST_HASH", LAST_HASH);

    // const changedPackages = `npx lerna ls -p --since ${LAST_HASH.trim()} --include-dependents`;

    const changedPackages = `npx lerna ls -p -- since HEAD~1 --include-dependents`;
    // const changed = execSync(changedPackages).toString();
    const { stdout: changed } = shell.exec(changedPackages);
    console.log("changed", changed);
    return changed;
  } catch (e) {
    console.log(e);
  }
}

const main = () => {
  const changedPackages = getChanged();
  const packagesPath = changedPackages.split("\n");
  console.log(changedPackages.split("\n"));

  packagesPath.forEach((package) => {
    if (package) {
      shell.cd(`${package}`);
      shell.echo("Running scripts for " + package);
      shell.exec("pwd");
      shell.exec("npm ci");
      shell.exec("npm run check");
    }
  });
};

main();
