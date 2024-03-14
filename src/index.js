import { JAYPIE, moduleLogger } from "@jaypie/core";

import connectFromSecretEnv from "./connectFromSecretEnv.function.js";

//
//
// Export
//

export { connectFromSecretEnv };

//
//
// Mongoose Pass-through
//

import mongoose from "mongoose";
export { mongoose };

//
//
// Functions
//

export const disconnect = async () => {
  const log = moduleLogger.with({ lib: JAYPIE.LIB.MONGOOSE });
  log.trace("[jaypie] Disconnecting from MongoDB");
  return await mongoose.disconnect();
};
