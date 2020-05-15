# storage-module

## how to use
### how to install
```bash
cd ~/.node-red/settings.js
npm i @things-factory/storage-module
```

### configuration
```javascript
// in ~/.node-red/settings.js
...,

storageModule: require('@things-factory/storage-module'),

...,

thingsFactory: {
  serverUrl: 'scheme://hostname:portnumber'
  user: {
    username: 'USERNAME',
    password: 'PASSWORD',
    domain: 'domainId'
  }
},

...


```
