// Port : celui de app/config.yaml (8000), fixe exprès. L'ancien SILLY_TAVERN_PORT = kernel.port() n'était jamais lu
// (ST ne lit que les variables SILLYTAVERN_*). Un port qui change à chaque lancement changerait l'origine de la page,
// et les réglages que les extensions gardent dans le localStorage du navigateur seraient perdus.
module.exports = async (kernel) => {
  return {
    daemon: true,
    run: [
      {
        method: "shell.run",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          message: [
            "node server"
          ],
          on: [{
            // The regular expression pattern to monitor.
            // When this pattern occurs in the shell terminal, the shell will return,
            // and the script will go onto the next step.
            "event": "/http:\/\/\\S+/",   

            // "done": true will move to the next step while keeping the shell alive.
            // "kill": true will move to the next step after killing the shell.
            "done": true
          }]
        }
      },
      {
        // This step sets the local variable 'url'.
        // This local variable will be used in pinokio.js to display the "Open WebUI" tab when the value is set.
        method: "local.set",
        params: {
          // the input.event is the regular expression match object from the previous step
          url: "{{input.event[0]}}"
        }
      },
  //    Uncomment this step to enable local wifi sharing (access the app from devices on the same network)
  //    {
  //      method: "proxy.start",
  //      params: {
  //        uri: "{{local.url}}",
  //        name: "Local Sharing"
  //      }
  //    }
    ]
  }
}
