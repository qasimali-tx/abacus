const { environment } = require('@rails/webpacker');

const webpack = require('webpack');
environment.plugins.prepend('Provide',
    new webpack.ProvidePlugin({
        // $: "jquery",
        // jQuery: "jquery",
        $: 'jquery/src/jquery',
        jQuery: 'jquery/src/jquery',
        jquery: 'jquery/src/jquery',
        Popper: 'popper.js/dist/popper',
        moment: 'moment/moment',
        'window.jQuery': 'jquery'
    })
);

module.exports = environment;