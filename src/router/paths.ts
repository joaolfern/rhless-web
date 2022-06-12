const paths = {
  unauth: {
    feed: '/*',
    login: '/authenticate',
    restorePassword: '/restore-password',
    userLogin: '/login'
  },
  auth: {
    home: '/home',
    users: '/users',
    jobs: '/jobs',
    candidates: '/candidates'
  }
}

export default paths
