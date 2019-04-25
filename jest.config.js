module.exports = {
    "collectCoverage": true,
    "coverageReporters": ["html", "json"],
    "roots": [
        "./src"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
}