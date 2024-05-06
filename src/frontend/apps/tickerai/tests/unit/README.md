```sh
jest --clearCache && yarn rimraf -rf ./node_modules/.cache &&  jest  --env=jsdom   --watchAll -- tests/unit/DataCreatorComponent.test.ts

jest --clearCache && yarn rimraf -rf ./node_modules/.cache &&  jest  --env=jsdom   --watchAll -- tests/unit/DemoComponent.test.ts
```
