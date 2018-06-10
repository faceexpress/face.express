module.exports = {
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    return config
  },
  // exportPathMap: function(defaultPathMap) {
  //   return {
  //     '/': { page: '/' },
  //     '/.well-known/acme-challenge/79OK5bw06hUWUaF8EJAMuATHSuSz4EQfzXhsHq-zlmE': { page: '/ssl-verification' },
  //   }
  // }
}
