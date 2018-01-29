// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  FRIENDBOT_IS_ENABLED: true,
  HORIZON_PRODUCTION_URL: 'http://localhost:8001',
  HORIZON_TEST_URL: 'http://localhost:8000',
  NETWORK_IS_PERSISTENT: false
};
