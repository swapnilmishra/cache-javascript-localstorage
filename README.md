cache-javascript-localstorage
=============================

A micro library to fetch and store javascript in localStorage and serves it from there for all the subsequent calls till its not cache busted explicitly.

#### Usage

Requires jQuery as dependency for script fetch call.

To use it call 

```javascript
  scriptsinlocal.require(url,key,cacheBust,callback)
```
__url : String | required__

Script url which you want to fetch.

__key : String | required__

Key name by which you want to store it in localStorage.

__cacheBust : Number,Boolean | optional | default:false__

Cache buster param to let it know if it should fetch the script again. It can take number values or boolean. By default cacheBuster is false. For e.g

In below code __34__ is cache busting param here so till you keep passing 34 it will load script from local storage but, if you change it to some other value it will make a new network call and fetch the script.
```javascript
 scriptsinlocal.require('myscript.js','mykey',34,callback)
```

In below code cache buster is __true__ means we want to bust the cache and make network call to fetch script irrespective of weather it is present in local storage or not.
```javascript
 scriptsinlocal.require('myscript.js','mykey',true,callback)
```

__callback : Function | optional__

A callback function which will be called after script is being loaded. This could be helpful in situations where your loaded script is a dependency for some other script which is not cached and to be loaded after this cached script is done loading.
