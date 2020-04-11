module.exports = {
    moduleFileExtensions: [
        "ts",
        "js"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "babel-jest"
    },
    testMatch: [
        "**/test/**/*.test.(ts|js)"
    ],
    testEnvironment: "node"
}