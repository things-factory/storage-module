const fetch = require('node-fetch')

var _flows = [
  { id: '7ec3dea8.97c7d', type: 'tab', label: '플로우 1', disabled: false, info: '' },
  {
    id: '4e029c4c.e0c364',
    type: 'inject',
    z: '7ec3dea8.97c7d',
    name: '',
    topic: '',
    payload: '',
    payloadType: 'date',
    repeat: '',
    crontab: '',
    once: false,
    onceDelay: 0.1,
    x: 240,
    y: 160,
    wires: [['14283fbe.6aea8']]
  },
  {
    id: '41069b98.4dbc74',
    type: 'http request',
    z: '7ec3dea8.97c7d',
    name: 'Get profile',
    method: 'GET',
    ret: 'txt',
    paytoqs: false,
    url: 'http://localhost:3000/profile',
    tls: '',
    persist: true,
    proxy: '',
    authType: '',
    x: 630,
    y: 160,
    wires: [['3198af58.bec21']]
  },
  {
    id: 'eade03cb.c929',
    type: 'debug',
    z: '7ec3dea8.97c7d',
    name: '',
    active: true,
    tosidebar: true,
    console: false,
    tostatus: false,
    complete: 'payload',
    targetType: 'msg',
    x: 1010,
    y: 160,
    wires: []
  },
  {
    id: '14283fbe.6aea8',
    type: 'function',
    z: '7ec3dea8.97c7d',
    name: 'Set headers',
    func:
      "msg.headers = {};\nmsg.headers['authorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEzOTk1MjhkLTdkZWYtNDdiMy04ZDMwLWQ2Mzc3MWM0ODcyNCIsInVzZXJUeXBlIjoiYWRtaW4iLCJzdGF0dXMiOiJhY3RpdmF0ZWQiLCJkb21haW4iOnsiaWQiOiJlMmY0YTJjMS1hNzkyLTRhODktYmI5ZS1jMjczMWQ0NWQ3NWMiLCJuYW1lIjoiU1lTVEVNIiwiZGVzY3JpcHRpb24iOm51bGwsInRpbWV6b25lIjpudWxsLCJzeXN0ZW1GbGFnIjp0cnVlLCJzdWJkb21haW4iOiJzeXN0ZW0iLCJicmFuZE5hbWUiOm51bGwsImJyYW5kSW1hZ2UiOm51bGwsImNvbnRlbnRJbWFnZSI6bnVsbCwidGhlbWUiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjAtMDQtMjFUMjM6NTc6NTAuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjAtMDQtMjFUMjM6NTc6NTAuMDAwWiJ9LCJpYXQiOjE1ODg4Mzg5MDIsImV4cCI6MTU4OTQ0MzcwMiwiaXNzIjoiaGF0aW9sYWIuY29tIiwic3ViIjoidXNlciJ9.kNxuy-48lwkp8BYKh2ij7EImB2Ex2iDaH70XzMcANl4';\nreturn msg;",
    outputs: 1,
    noerr: 0,
    x: 430,
    y: 160,
    wires: [['41069b98.4dbc74']]
  },
  {
    id: '3198af58.bec21',
    type: 'json',
    z: '7ec3dea8.97c7d',
    name: 'to Object',
    property: 'payload',
    action: '',
    pretty: false,
    x: 820,
    y: 160,
    wires: [['eade03cb.c929']]
  }
]

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

    return

    // return new Promise((resolve, reject) => {

    // })
  },

  getFlows: async function () {
    // const response = await fetch('http://localhost:3000/get-flows')
    // const flows = await response.text()

    const flows = _flows
    return flows
  },

  saveFlows: async function (flows) {
    _flows = flows
  },

  getCredentials: async function () {
    console.log('------------------------------------------- getCredentials', this.settings)
    return false
  }
}

module.exports = thingsFactoryStorage
