(function (window) {
  window.env = window.env || {}

  // postbuild-time environment variables
  window.env.FIXED_CHAIN_ID = '${FIXED_CHAIN_ID}'
  window.env.BACKEND_URL = '${BACKEND_URL}'
})(this)
