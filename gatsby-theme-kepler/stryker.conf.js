/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

// Please see the handbook for more information: https://github.com/stryker-mutator/stryker-handbook/blob/master/stryker/guides/react.md#react
module.exports = function(config) {
  config.set({
    mutate: [
      "src/**/*.ts?(x)",
      "!src/**/*@(.test|.spec|Spec).ts?(x)",
      "!src/__mocks__/**/*.ts?(x)"
    ],
    mutator: "typescript",
    testRunner: "jest",
    reporters: ["progress", "clear-text", "html"],
    coverageAnalysis: "off",
    jest: {
      projectType: "custom",
      // Only use the unit test project
      config: require(path.resolve(__dirname, "./jest.config.js")).projects[0],
      enableFindRelatedTests: true
    }
  });
};
