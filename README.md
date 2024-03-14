# Jaypie Mongoose 🐦‍⬛🪿

MongoDB management for Jaypie 

## 📋 Usage

### Installation

```bash
npm install @jaypie/mongoose
```

### Example

```javascript
import { jaypieHandler } from "@jaypie/core";
import { connectFromSecretEnv, disconnect, mongoose } from "@jaypie/mongoose";

export default jaypieHandler(
  // Handler function
  async (...args) => {

    // "Your Code Here"
    // Do something with `mongoose`?

    return json;
  },
  // Configuration (optional)
  {
    name: "myEventHandler",
    setup: [connectFromSecretEnv], // Array of setup functions
    teardown: [disconnect], // Array of teardown functions
  },
);
```

#### Example Caveats

* `SECRET_MONGODB_URI` environment variable containing AWS secret name and associated permissions described in `connectFromSecretEnv` prerequisites (below)
* Use `expressHandler` or `lambdaHandler`, not `jaypieHandler` directly

## 📖 Reference

```javascript
const {
  connectFromSecretEnv,
  disconnect,
  mongoose,
} = require('@jaypie/mongoose');
```

### `connectFromSecretEnv`

```javascript
import { jaypieHandler } from "@jaypie/core";
import { connectFromSecretEnv } from "@jaypie/mongoose";

export default jaypieHandler(
  // Handler function
  async (...args) => {

    // "Your Code Here"
    // Do something with `mongoose`?
    // Don't forget to `mongoose.disconnect()` or better yet, pass `disconnect` to `teardown`

    return json;
  },
  // Configuration (optional)
  {
    name: "myEventHandler",
    setup: [connectFromSecretEnv],
  },
);

// This is a theoretical example. In practice you would use this as a handler lifecycle function
const mongoose = await connectFromSecretEnv();
```

#### Prerequisites

* An AWS secret. Ths can be deployed by CDK with `new secretsManager.Secret`
* The lambda function must have access to the secret. CDK `mongoConnectionString.grantRead(expressLambda);`
* The AWS lambda params and secrets layer. CDK `lambda.ParamsAndSecretsLayerVersion.fromVersion`
* The lambda function must have access to the secrets layer. CDK `paramsAndSecrets: paramsAndSecretsLayer,`
* The _name_ of secret. Usually it is ugly like `MongoConnectionString37D5BF-XUCja0vKbFwa`. CDK `mongoConnectionString.secretName`
* This name stored in an environment variable, preferably `SECRET_MONGODB_URI`. CDK `SECRET_MONGODB_URI: mongoConnectionString.secretName,` in the lambda `environment` property

If this sounds like a lot think about never thinking about it again 👺

### `disconnect`

What it says on the tin. Literally:

```javascript
return await mongoose.disconnect();
```

### `mongoose`

The `mongoose` object

```javascript
import { mongoose } from "@jaypie/mongoose";

// Honk!
```


## 📝 Changelog

| Date       | Version | Summary        |
| ---------- | ------- | -------------- |
|  3/13/2024 |   0.0.1 | Initial commit |

## 📜 License

Published by Finlayson Studio. All rights reserved
