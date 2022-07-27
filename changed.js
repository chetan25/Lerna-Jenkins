// const util = require("util");
// const exec = util.promisify(require('child_process').exec);
// const execSync = require("child_process").execSync;

const shell = require("shelljs");

function getChanged() {
  try {
    // GIT_LATEST_TAG_COMMAND = "git describe origin/main";
    // const { stdout: GIT_LATEST_TAG } = shell.exec(GIT_LATEST_TAG_COMMAND, {
    //   silent: true,
    // });
    // console.log(GIT_LATEST_TAG.trim(), "GIT_LATEST_TAG");

    // GIT_BRANCH_COMMAND = "git rev-parse --abbrev-ref HEAD";
    // const { stdout: GIT_BRANCH } = shell.exec(GIT_BRANCH_COMMAND, {
    //   silent: true,
    // });
    // console.log("GIT_BRANCH", GIT_BRANCH.trim());

    // const COMMIT_HASH = `git merge-base ${GIT_BRANCH.trim()}  ${GIT_LATEST_TAG.trim()}`;
    // console.log(COMMIT_HASH);
    // const { stdout: LAST_HASH } = shell.exec(COMMIT_HASH, {
    //   silent: true,
    // });
    // console.log("LAST_HASH", LAST_HASH);

    // const changedPackages = `npx lerna ls -p --since ${LAST_HASH.trim()} --include-dependents`;

    // const changedPackages = `npx lerna ls -p -- since HEAD~1 --include-dependents`;
    const changedPackages = `npx lerna changed --json`;
    // const changed = execSync(changedPackages).toString();
    const { stdout: changed } = shell.exec(changedPackages);
    // console.log("changed", changed);
    return changed;
  } catch (e) {
    console.log(e);
  }
}

const main = () => {
  const changedPackages = JSON.parse(getChanged());
  // const packagesPath = changedPackages.split("\n");
  console.log(typeof changedPackages);
  if (!changedPackages.length) {
    throw new Error("No Packages to publish");
  }

  // will be used by lerna to publish packages
  const packagesToUpdate = "{";
  changedPackages.forEach((package) => {
    if (package) {
      packagesToUpdate += package.name + ",";
      // shell.cd(`${package.location}`);
      // shell.echo("Running scripts for " + package.name);
      // shell.exec("pwd");
      // shell.exec("npm ci");
    }
  });
  console.log(packagesToUpdate);

  const { stdout, stderr, code } = shell.exec(
    `npx lerna exec --parallel --scope '${packagesToUpdate}' -- npm run check`
  );
  console.log(code, "code ");
  console.log(stdout, "stdout");
  if (code < 1) {
    throw new Error("Error validating the packages");
  }

  // if (packagesToUpdate.length )
  //  npx lerna publish --skip-npm --yes minor

  // won't work as we cannot publish individual packages
  // npx lerna version --ignore-changes 'D:\Programming\git-jenkins\lerna-jenkins\packages\appB'

  // to run command in selected packages in parallel
  // npx lerna exec --parallel --scope '{appa,appb}' -- npm run check
};

main();
