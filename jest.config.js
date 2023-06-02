/** @type {import('ts-jest').JestConfigWithTsJest} */
const dotenv =require("dotenv");
dotenv.config({ path: "./test-api/.env" });
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};