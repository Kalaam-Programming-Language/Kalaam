module.exports = {
    'extends': 'eslint:recommended',
    'parser': 'babel-eslint',
    'env': {
        'browser': true,
        'node': true,
    },
    'rules': {
        // enable additional rules
        'indent': ['error', 4,],
        'linebreak-style': ['error', 'unix',],
        'quotes': ['error', 'single',],
        'semi': ['error', 'always',],

        // override default options for rules from base configurations
        'comma-dangle': ['error', 'always',],
        
        'no-cond-assign': ['error', 'always',],
        
      

        // disable rules from base configurations
        'no-console': 'off',
        'no-useless-escape':'off',
        'no-irregular-whitespace':'off',
        'no-self-assign':'off',
        'no-redeclare': 'off',
        'no-inner-declarations': 'off',
        'no-case-declarations':'off'
      

    },
};