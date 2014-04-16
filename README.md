cache-javascript-localstorage
=============================

Simple utility micro library to fetch and store javascript in localStorage to use it for next time.

#### Usage

Requires jQuery as dependency for script fetch call.

To use it call 

```javascript
  fclocalstorage.require(url<String|required>,key<String|required>,cacheBuster<Boolean|optional>)
```

Key is the key name by which you want to store it. Pass the cacheBuster param if you want to fetch it again. By default cahceBuster is false.
