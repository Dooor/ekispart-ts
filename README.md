# ekispart-ts

## Installation

```
npm install ekispart-ts --save
yarn add ekispart-ts
```

## Usage

### TypeScript

```ts
import { client as EkispartClient } from "ekispart-ts"
const ekispartClient = new EkispartClient({ accessKey: 'xxx', format: 'json' })
ekispartClient.getStation('新宿')
  .then((response) => console.log(response))
  .catch((error) => console.error(errror))
```

## Test

```
npm run test
```
