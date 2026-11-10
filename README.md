# SillyTavern (lanceur Pinokio)

[SillyTavern](https://docs.sillytavern.app/) est une interface web locale pour discuter et faire du jeu de rôle avec des personnages, branchée sur un moteur de texte (ici koboldcpp) et, en option, un moteur d'images (ComfyUI).

## Utilisation

| Bouton | Ce qu'il fait |
|---|---|
| Install | Clone SillyTavern dans `app/` et installe ses dépendances Node (`--omit=dev`) |
| Start | Lance `node server` ; l'onglet « Open Web UI » apparaît dès que l'adresse est affichée |
| Update | Met à jour le lanceur et SillyTavern (`git pull`), puis réinstalle les dépendances |
| Reset | Réinstalle les dépendances ; chats, cartes, sprites et extensions (`app/data/`) sont gardés |

Les données de l'utilisateur vivent dans `app/data/default-user/` ; `app/` est ignoré par le dépôt du lanceur.

## API

SillyTavern écoute en local (`listen: false`) sur le port de `app/config.yaml` (8000). Son API HTTP est interne : chaque requête POST demande un jeton CSRF et le cookie de session.

Curl :

```bash
curl -c st.cookies http://127.0.0.1:8000/csrf-token
curl -b st.cookies -H "X-CSRF-Token: <jeton>" -H "Content-Type: application/json" -X POST http://127.0.0.1:8000/api/characters/all -d "{}"
```

JavaScript (Node 18+) :

```javascript
const base = 'http://127.0.0.1:8000';
const r = await fetch(base + '/csrf-token');
// La session de ST tient en DEUX cookies (valeur + signature .sig) : get('set-cookie') les fusionne et perd la signature.
const cookie = r.headers.getSetCookie().map(c => c.split(';')[0]).join('; ');
const { token } = await r.json();
const chars = await fetch(base + '/api/characters/all', {
  method: 'POST',
  headers: { 'X-CSRF-Token': token, 'Content-Type': 'application/json', cookie },
  body: '{}',
}).then(x => x.json());
console.log(chars.map(c => c.name));
```

Python :

```python
import requests
s = requests.Session()
token = s.get('http://127.0.0.1:8000/csrf-token').json()['token']
chars = s.post('http://127.0.0.1:8000/api/characters/all', json={}, headers={'X-CSRF-Token': token}).json()
print([c['name'] for c in chars])
```

Pour générer du texte sans l'interface, appeler directement le moteur (koboldcpp : `POST http://127.0.0.1:5001/api/v1/generate`).
