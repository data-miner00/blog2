var { execSync } = require("child_process");

// best effort basis
module.exports = function () {
  var commit = null;

  try {
    commit = execSync("git rev-parse HEAD", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
  }

  return {
    commit,
    shortCommit: commit && commit.slice(0, 7),
  };
};
