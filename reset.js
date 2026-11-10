// Reset = réinstaller les dépendances npm SANS toucher aux données.
// Avant le 10/10/2026 : fs.rm "app" effaçait aussi app/data (chats, cartes, sprites, extensions
// maison qui n'existent nulle part ailleurs), après une simple confirmation.
// Désormais : on supprime app/node_modules puis on relance la même installation que install.js.
// Repartir vraiment de zéro = sauvegarder app/data d'abord, puis supprimer app à la main.
module.exports = {
  run: [{
    method: "fs.rm",
    params: {
      path: "app/node_modules"
    }
  }, {
    method: "shell.run",
    params: {
      venv: "env",
      path: "app",
      env: {
        NODE_ENV: "production"
      },
      message: [
        "npm i --no-audit --no-fund --quiet --omit=dev"
      ]
    }
  }]
}
