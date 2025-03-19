export default {
  testEnvironment: "node", // Use Node.js environment
  testMatch: ["**/*.test.js"], // Match test files
  transform: {
    "^.+\\.js$": "babel-jest", // Use Babel to transform ES modules
  },
};