cache-javascript-localstorage
=============================

Simple utility micro library to fetch and store javascript in localStorage to use it for next time.

#### Usage

Requires jQuery as dependency for script fetch call.

To use it call 

```javascript
  scriptsinlocal.require(url,key,cacheBust)
```
__url : String | required__

Script url which you want to fetch.

__key : String | required__

Key name by which you want to store it in localStorage.

__cacheBust : String | optional | default:false__

Cache buster param if you want to fetch it again. By default cacheBuster is false.
