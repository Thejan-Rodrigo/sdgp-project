export default {
  testEnvironment: "node", // Use Node.js environment
  transform: {
    "^.+\\.mjs$": "babel-jest", // Use Babel to transform .mjs files
    "^.+\\.js$": "babel-jest", // Use Babel to transform .js files
  },
  moduleFileExtensions: ["js", "mjs"], // Allow .mjs files
};