```sh
jest --clearCache && yarn rimraf -rf ./node_modules/.cache &&  jest  --env=node   --watchAll -- tests/units/news.operators.test.ts

jest --clearCache && yarn rimraf -rf ./node_modules/.cache &&  jest  --env=node   --watchAll -- tests/units/news.service.test.ts

# jest --clearCache && yarn rimraf -rf ./node_modules/.cache &&  jest  --env=jsdom   --watchAll -- tests/unit/datatalks-choose-target-nodes-component.test.ts

# jest --clearCache && yarn rimraf -rf ./node_modules/.cache &&  jest  --env=jsdom   --watchAll -- tests/unit/DemoComponent.test.ts
```
