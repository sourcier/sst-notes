import { SSTConfig } from "sst";
import { StorageStack } from "./stacks/StorageStack";
import { ApiStack } from "./stacks/ApiStack";
import { AuthStack } from "./stacks/AuthStack";

export default {
  config(_input) {
    return {
      name: "sst-notes",
      region: "eu-west-2",
    };
  },
  stacks(app) {
    app.stack(StorageStack).stack(ApiStack).stack(AuthStack);
  },
} satisfies SSTConfig;
