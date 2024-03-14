import { getSecret } from "@jaypie/aws";
import { ConfigurationError, JAYPIE, moduleLogger } from "@jaypie/core";

import mongoose from "mongoose";

//
//
// Main
//

/**
 * Use the AWS Secret named `process.env.SECRET_MONGODB_URI` to connect to Mongoose.
 * The `process.env[key]` should be the name of the AWS Secret (e.g., `"MongoConnectionString37D5BF-XUCja0vKbFwa"`)
 * The secret should contain the MongoDB connection URI.
 * @param {string} key (optional) process.env[key] holding AWS secret name; default="SECRET_MONGODB_URI"
 * @returns {Promise<mongoose>} resolves to `this` mongoose instance
 * @throws {ConfigurationError} if key is not found in process.env
 */
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
  // https://mongoosejs.com/docs/api/mongoose.html#Mongoose.prototype.connect()
  return mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });
};

//
//
// Export
//

export default connectFromSecretEnv;
