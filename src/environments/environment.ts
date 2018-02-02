// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  CUSTOM_HORIZON_PRODUCTION_URL: 'http://localhost:8000',
  CUSTOM_HORIZON_TEST_URL: 'http://localhost:8000',
  CUSTOM_NETWORK_PRODUCTION_PASSPHRASE: 'Integration Test Network ; zulucrypto',
  CUSTOM_NETWORK_TEST_PASSPHRASE: 'Integration Test Network ; zulucrypto',
  STELLAR_HORIZON_PRODUCTION_URL: 'https://horizon.stellar.org',
  STELLAR_HORIZON_TEST_URL: 'https://horizon-testnet.stellar.org/',
  STELLAR_NETWORK_PRODUCTION_PASSPHRASE: 'Public Global Stellar Network ; September 2015',
  STELLAR_NETWORK_TEST_PASSPHRASE: 'Test SDF Network ; September 2015',
};
