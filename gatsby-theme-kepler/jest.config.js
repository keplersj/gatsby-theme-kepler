module.exports = {
  collectCoverage: true,
  coverageReporters: ["json", "text"],
  projects: [
    {
      displayName: "test",
      preset: "jest-preset-gatsby/typescript",
      snapshotSerializers: [
        "jest-emotion",
        "jest-serializer-react-helmet-async",
        "jest-serializer-json-ld-script"
      ],
      collectCoverage: true,
      coverageReporters: ["json", "text"],
      coveragePathIgnorePatterns: [
        "/node_modules/",
        "<rootDir>/src/__mockData__/"
      ],
      moduleNameMapper: {
        "modern-normalize": "jest-transform-stub",
        "starstuff-style": "jest-transform-stub"
      },
      transformIgnorePatterns: ["node_modules/(?!(gatsby-plugin-mdx)/)"]
    },
    {
      runner: "eslint",
      displayName: "lint:eslint",
      testMatch: [
        "<rootDir>/**/*.jsx",
        "<rootDir>/**/*.js",
        "<rootDir>/**/*.tsx",
        "<rootDir>/**/*.ts"
      ],
      testPathIgnorePatterns: [
        "/.cache/",
        "/coverage/",
        "/node_modules/",
        "/public/",
        "/reports/",
        "/static/",
        "/package-lock.json",
        "/package.json"
      ]
    },
    {
      preset: "jest-runner-prettier",
      displayName: "lint:prettier",
      testPathIgnorePatterns: [
        "/.cache/",
        "/coverage/",
        "/node_modules/",
        "/public/",
        "/reports/",
        "/static/",
        "/package-lock.json",
        "/package.json"
      ]
    },
    {
      preset: "jest-runner-stylelint",
      displayName: "lint:stylelint",
      testPathIgnorePatterns: [
        "/.cache/",
        "/coverage/",
        "/node_modules/",
        "/public/",
        "/reports/"
      ]
    }
  ]
};
