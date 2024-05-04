import { afterEach, describe, expect, it, vi } from "vitest";

// Subject
import connect from "../connect.function.js";

//
//
// Mock modules
//

// vi.mock("../file.js");
// vi.mock("module");

afterEach(() => {
  vi.clearAllMocks();
});

//
//
// Run tests
//

describe("Connect Function", () => {
  it("Works", async () => {
    const response = await connect();
    console.log("response :>> ", response);
    expect(response).not.toBeUndefined();
  });
});
