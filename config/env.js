var config = {
        local: {
                mode: 'local',
                api_host: 'api.local.com',
                port: 8080,
                client_host: 'client.local.com'
        },
        staging: {
                mode: 'staging',
                api_host: 'api.staging.com',
                port: 4300,
                client_host: 'client.local.com'
        },
        production: {
                mode: 'production',
                api_host: 'api.prod.com',
                port: 3000,
                client_host: 'client.local.com'
        }
};

logfile = './logfile.log';

module.exports = function(mode) {
        return config[mode || process.argv[2] || 'local'] || config.local;
};
