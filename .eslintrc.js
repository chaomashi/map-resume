module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:vue/recommended"
    ],
    rules: {
        "vue/html-self-closing": "off",
        "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
        "vue/max-attributes-per-line": [4,
            {
                "singleline": 4,
                "multiline": {
                    "max": 1,
                    "allowFirstLine": true
                }
            }
        ],
    }
  }