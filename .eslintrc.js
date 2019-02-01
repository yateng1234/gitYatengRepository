module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	  // allow paren-less arrow functions
	  'arrow-parens': 0,
	  "no-var": 0, //禁用var，用let和const代替
	  "no-unreachable": 2, //不能有无法执行的代码
	  "no-unused-expressions": 2, //禁止无用的表达式
	  "no-trailing-spaces": 1,//一行结束后面不要有空格
	  "spaced-comment": 0,//注释风格要不要有空格什么的
	  "no-tabs": "off",
	  "indent":[0,2]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
