const Encore = require('@symfony/webpack-encore');

// Configure manuellement l'environnement d'exécution si ce n'est pas encore configuré par la commande "encore".
// C'est utile lorsque vous utilisez des outils qui dépendent du fichier webpack.config.js.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // Répertoire où les ressources compilées seront stockées
    .setOutputPath('public/build/')
    // Chemin public utilisé par le serveur web pour accéder au répertoire de sortie
    .setPublicPath('/build')
    // Uniquement nécessaire pour les CDN ou le déploiement dans des sous-répertoires
    //.setManifestKeyPrefix('build/')

    /*
     * CONFIGURATION DES POINTS D'ENTRÉE
     *
     * Chaque point d'entrée donnera lieu à un fichier JavaScript (par exemple, app.js)
     * et un fichier CSS (par exemple, app.css) si votre JavaScript importe du CSS.
     */
    .addEntry('app', './assets/app.js')


    // Lorsqu'il est activé, Webpack "découpe" vos fichiers en morceaux plus petits pour une meilleure optimisation.
    .splitEntryChunks()

    // Nécessitera une balise de script supplémentaire pour runtime.js
    // mais vous en aurez probablement besoin, sauf si vous construisez une application monopage
    .enableSingleRuntimeChunk()

    /*
     * CONFIGURATION DES FONCTIONNALITÉS
     *
     * Activez et configurez d'autres fonctionnalités ci-dessous. Pour une liste complète
     * des fonctionnalités, consultez :
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // Active les noms de fichiers hachés (par exemple, app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // Configure Babel
    // .configureBabel((config) => {
    //     config.plugins.push('@babel/a-babel-plugin');
    // })

    // Active et configure les polyfills @babel/preset-env
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.23';
    })

// Active la prise en charge de Sass/SCSS
//.enableSassLoader()

// Décommentez si vous utilisez TypeScript
//.enableTypeScriptLoader()

// Décommentez si vous utilisez React
//.enableReactPreset()

// Décommentez pour obtenir des attributs d'intégrité "..." sur vos balises script et lien
// nécessite WebpackEncoreBundle 1.4 ou version ultérieure
//.enableIntegrityHashes(Encore.isProduction())

// Décommentez si vous avez des problèmes avec un plugin jQuery
//.autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();
