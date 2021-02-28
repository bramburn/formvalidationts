module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [

    '@nuxtjs/eslint-config-typescript'
  ],
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'import'
  ],

  settings: {
    jsdoc: {
      tagNamePreference: {
        returns: 'return'
      }
    }
  }
}
