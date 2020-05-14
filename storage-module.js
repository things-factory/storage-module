const fetch = require('node-fetch')

function moduleSelector(aSettings) {
  var toReturn
  if (aSettings.storageModule) {
    if (typeof aSettings.storageModule === 'string') {
      // TODO: allow storage modules to be specified by absolute path
      toReturn = require('./' + aSettings.storageModule)
    } else {
      toReturn = aSettings.storageModule
    }
  } else {
    toReturn = require('./localfilesystem')
  }
  return toReturn
}

function is_malicious(path) {
  return path.indexOf('../') != -1 || path.indexOf('..\\') != -1
}

const thingsFactoryStorage = {
  init: async function (settings, runtime) {
    thingsFactoryStorage.settings = settings
    thingsFactoryStorage.runtime = runtime

    // if (!settings.thingsFactoryStorageBucket || !settings.googleProjectId || !settings.googleCredentials) {
    //   reject('Cannot initialize without Google Cloud settings')
    // } else {
    //   //console.log('---- *** node-red google cloud storage got all needed settings! *** ---')
    //   if (settings.flowFile) {
    //     flowFile = settings.flowFile.replace('.json', '')
    //   }
    //   thingsFactoryStorage.getBucket().then(() => {
    //     if (settings.googleFirebaseReload === true) {
    //       thingsFactoryStorage.setupFirebaseListener()
    //     }
    //     thingsFactoryStorage.prepopulateFlows(resolve)
    //   })
    // }

    const { username: email, password } = settings.thingsFactory.user

    const response = await fetch(`http://localhost:3000/signin`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    return

    // return new Promise((resolve, reject) => {

    // })
  },

  getFlows: async function () {
    const myDomain = this.settings.thingsFactory.user.domain

    const response = await fetch(`http://localhost:3000/get-flows/${myDomain}`, {
      credentials: 'include'
    })
    const json = await response.json()
    const flow = json.flow

    return flow
  },

  saveFlows: async function (flows) {
    const myDomain = this.settings.thingsFactory.user.domain

    const response = await fetch(`http://localhost:3000/save-flows/${myDomain}`, {
      method: 'POST',
      body: JSON.stringify({
        flows
      }),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    })
    return true
  },

  getCredentials: async function () {
    console.log('------------------------------------------- getCredentials', this.settings, this.settings.adminAuth)
    return true
  }
}

module.exports = thingsFactoryStorage
