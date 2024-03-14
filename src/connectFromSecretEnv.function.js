import { getSecret } from "@jaypie/aws";
import { ConfigurationError, JAYPIE, moduleLogger } from "@jaypie/core";

import mongoose from "mongoose";

// Mongoose is CommonJS and these are not named exports
const { connect } = mongoose;

//
//
// Main
//

const connectFromSecretEnv = async (key = "SECRET_MONGODB_URI") => {
  if (!key)
    throw new ConfigurationError(
      "No `key` provided (default is SECRET_MONGODB_URI)",
    );
  const log = moduleLogger.with({ lib: JAYPIE.LIB.MONGOOSE });

  const mongoConnectionString = process.env[key];
  if (!mongoConnectionString) {
    throw new ConfigurationError(`No ${key} available in process.env`);
  }
  const uri = await getSecret(mongoConnectionString);
  if (!uri) throw new ConfigurationError("MONGODB_URI is undefined");
  // Let connect() throw errors if there are other problems. As far as the app is concerned the game is over
  log.trace("[jaypie] Connecting to MongoDB");
  return connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });
};

//
//
// Export
//

export default connectFromSecretEnv;
