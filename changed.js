const util = require("utils");
// const exec = util.promisify(require('child_process').exec);
const execSync = require("child_process").execSync;

function getChanged() {
  try {
    const PREV_RELEASED_COMMIT_HASH =
      "git merge-base $(git rev-parse --abbrev-ref HEAD) $(git describe origin/master)";
    const changedPackages =
      "npx lerna ls -p --since $PREV_RELEASED_COMMIT_HASH --include-dependents";

    const changed = execSync(changedPackages).toString();
    console.log(changed);
  } catch (e) {
    console.log(e);
  }
}
