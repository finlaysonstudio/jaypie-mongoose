import { describe, expect, it } from "vitest";

// Subject
import { connectFromSecretEnv } from "../index.js";

//
//
// Run tests
//

describe("Index", () => {
  it("Works", () => {
    expect(connectFromSecretEnv).toBeFunction();
  });
});
