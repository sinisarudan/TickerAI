```sh
cdtf
cd src/news
jest --clearCache && yarn rimraf -rf ./node_modules/.cache &&  jest  --env=node   --watchAll -- tests/unit/store-news.test.ts
```
