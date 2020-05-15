const fetch = require('node-fetch')

const thingsFactoryStorage = {
  init: async function (settings, runtime) {
    thingsFactoryStorage.settings = settings
    thingsFactoryStorage.runtime = runtime

    const { serverUrl, user } = this.settings.thingsFactory
    const { username: email, password } = user

    const response = await fetch(`${serverUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json', 'x-only-token': true }
    })

    this.accessToken = await response.text()

    return
  },

  getFlows: async function () {
    const { serverUrl, user } = this.settings.thingsFactory
    const { domain: myDomain } = user

    const response = await fetch(`${serverUrl}/get-flows/${myDomain}`, {
      headers: {
        authorization: this.accessToken
      }
    })
    const json = await response.json()
    const flow = json.flow

    return flow
  },

  saveFlows: async function (flows) {
    const { serverUrl, user } = this.settings.thingsFactory
    const { domain: myDomain } = user

    const response = await fetch(`${serverUrl}/save-flows/${myDomain}`, {
      method: 'POST',
      body: JSON.stringify({
        flows
      }),
      headers: { 'Content-Type': 'application/json', authorization: this.accessToken }
    })
    return true
  },

  getCredentials: async function () {
    console.log('------------------------------------------- getCredentials')
    return true
  }
}

module.exports = thingsFactoryStorage
