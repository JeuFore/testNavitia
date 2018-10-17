# gladys-navitia

## Pré-requis

Nécessite Gladys >= 3.0.0.

## Installation

* Créer une clé API sur le site de Navitia :
https://www.navitia.io/register/
* Installer le module dans le store sur Gladys.
* Créer dans les paramètres de Gladys une clé qui s’appellera NAVITIA_API_KEY, et à coté on y ajoute la clé API que vous avez obtenus sur le site
* Rebooter Gladys.

## Utilisation

Dans un script, nous pouvons écrire :

```javascript
var options = {
    coverage : 'sncf',
    origin : '10 Rue des Charmes, 67150 Limersheim',
    destination : '9 Place de la Cathédrale, 67000 Strasbourg',
    mode : 'car'
};

gladys.modules.navitia.exec(options);
```

* C’est un exemple :wink:, du coup le coverage vous n’êtes pas obliger de le mettre, l’origin aussi, et le mode vous pouvez mettre ‘car’ ou ‘bike’.
