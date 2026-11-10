module.exports = {
  run: [{
    method: "shell.run",
    params: {
      message: "git pull"
    }
  }, {
    method: "shell.run",
    params: {
      path: "app",
      message: "git pull"
    }
  }, {
    method: "shell.run",
    params: {
      venv: "env",
      path: "app",
      env: {
        NODE_ENV: "production"
      },
      message: "npm i --no-audit --no-fund --quiet --omit=dev"
    }
  }]
}
