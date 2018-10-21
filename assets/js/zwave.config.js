gladys.location.getUser({id: 1})
	.then((location) => {			
		
		// Position de l'utilisateur
		from = `${location.longitude};${location.latitude}`;
    })
    
    console.log(from)

var translationsEN = {
    APPLY:'Apply',
    APPLY_CONFIGURATION:'Apply configuration',
    CANCEL: 'Cancel',
    COM_NAME: 'Com name',
    CONFIGURE_CONTROLLER: 'Configure controller',
    CONFIGURATION_CONTROLLER_TEXT: 'Select your controller from the list to save information such as manufacturer and device type. So if the com port change after a restart, the controller will automatically be called and its com port will be updated.',
    CONFIGURATION: 'Configuration',    
    CONFIGURATION_CONTROLLER: 'Configuration\'s controller',
    EMPTY_NODE_TABLE: from,
    ERROR: 'Something bad happened :/ Check Gladys logs for more informations.',
    EXCLUDE_NODE: 'Exclude a node',
    EXCLUDED_NODE:'The node has been excluded from the network !',
    EXCLUDING_NODE: 'Excluding a node',
    EXCLUSION_PROCEDURE: 'You must press the device button to start the exclusion procedure.',
    HEAL_NETWORK: 'Heal network',
    HEALING_NETWORK: 'Network healing!',
    INCLUDE_NODE: 'Include a node',
    INCLUDING_NODE: 'Including a node',
    INCLUSION_PROCEDURE: 'You must press the device button to start the inclusion procedure.',
    MANUFACTURER: 'Manufacturer',
    NAME: 'Name',
    NETWORK_MANAGEMENT: 'Network management',
    NODES: 'Nodes',
    NODE_CONFIGURATION:'Node configuration',
    NODE_ID: 'Node id',
    NODE_NAME_UPDATED: 'Node name updated !',
    PRODUCT: 'Product',
    PRODUCT_ID: 'Product id',
    RESTART_CONTROLLER: 'Restart controller',
    RESTARTING:'Restarting...',
    SCAN: 'Scan',
    SETTINGS_APPLIED:'Settings applied !',
    TYPE: 'Type',
}

var translationsFR = {
    APPLY:'Appliquer',
    APPLY_CONFIGURATION:'Appliquer la configuration',
    CANCEL: 'Annuler',
    COM_NAME: 'Port com',
    CONFIGURE_CONTROLLER: 'Configurer le controller',
    CONFIGURATION: 'Configuration',
    CONFIGURATION_CONTROLLER: 'Configuration du controller',
    CONFIGURATION_CONTROLLER_TEXT: 'Sélectionnez votre controller dans la liste pour sauvegarder les informations telles que le fabricant et le type d’appareil. Ainsi si le port com change au prochain redémarrage, le controller sera automatiquement détecté grâce à ces informations et son port com sera mis à jour.',
    EMPTY_NODE_TABLE: from,
    ERROR: 'Une erreur inconnue est arrivée :/ Regardez les logs Gladys pour plus d\'informations.',
    EXCLUDE_NODE: 'Exclure un noeud',
    EXCLUDED_NODE:'Le noeud a été exclu du réseau !',
    EXCLUDING_NODE: 'Exclusion d\'un noeud',
    EXCLUSION_PROCEDURE: 'Veuillez appuyer sur le bouton du dispositif afin de lancer la procédure d\'exclusion.',
    HEAL_NETWORK: 'Guérir le réseau',
    HEALING_NETWORK: 'Lancement de la guérison du réseau !',
    INCLUDE_NODE: 'Inclure un noeud',
    INCLUDING_NODE: 'Inclusion d\'un noeud',
    INCLUSION_PROCEDURE: 'Veuillez appuyer sur le bouton du dispositif afin de lancer la procédure d\'inclusion.',
    MANUFACTURER: 'Fabricant',
    NAME: 'Nom',
    NETWORK_MANAGEMENT: 'Gestion du réseau',
    NODES:'Noeuds',
    NODE_CONFIGURATION:'Configuration du noeud',
    NODE_ID: 'Id du noeud',
    NODE_NAME_UPDATED:'Nom du noeud mis à jour !',
    PRODUCT: 'Produit',
    PRODUCT_ID: 'Id du produit',
    RESTART_CONTROLLER: 'Redémarrer le controller',
    RESTARTING:'Redémarrage en cours...',
    SCAN: 'Scanner',
    SETTINGS_APPLIED:'Paramètres appliqués !',
    TYPE: 'Type',
}

angular
    .module('gladys')
    .config(['$translateProvider', function($translateProvider) {
        // add translation table
        $translateProvider
            .translations('en', translationsEN)
            .translations('fr', translationsFR);
    }]);