module.exports = {
    setupFiles: ["./jest.setup.js"],
    globals: {
        URL: "http://localhost:8080"
    },
    testMatch: [
        "**/test/**/*.test.js"
    ],
    verbose: true
}