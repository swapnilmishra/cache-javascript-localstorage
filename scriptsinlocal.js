(function(window,document,localStorage){

  var configs = {
    key         : undefined,
    url         : undefined,
    cacheBuster : undefined,
    callback    : undefined
  };

  var head = document.head || document.getElementsByTagName('head')[0];

  var require = function(key,url,cacheBuster,callback){
    console.time('Fetch Templates');
    configs.key = key;
    configs.url = url;
    configs.cacheBuster = cacheBuster;
    configs.callback = callback;

    if(configs.key){
      resolveScript(configs.url);
    }
    else {
      console.log("No key supplied. Key is mandatory");
    }
  }

  var resolveScript = function(url){
    
    var scriptData = getLocalStoreData(configs.key),
        cacheBuster = configs.cacheBuster;

    if(scriptData){
      console.log('script found in local Storage');
      if(cacheBuster && typeof cacheBuster === 'number'){
        if(cacheBuster === parseInt(scriptData.cacheBuster)){
          console.log('No cache busting(number) => Inject Script');
          injectScript(scriptData.data,configs.callback);
        }
        else {
          console.log('Cache busting(number) => Fetch Script');
          fetchScript(configs.url);
        }
      }
      else if(typeof cacheBuster === 'boolean'){
        console.log('Cache busting boolean');
        if(cacheBuster){
          console.log('Cache busting(boolean) => Fetch Script');
          fetchScript(configs.url);
        }
        else{
          console.log('No cache busting(boolean) => Inject Script');
          injectScript(scriptData.data,configs.callback);
        }
      }
      else {
        console.log('Either cache buster is undefined or not of proper type. Injecting script anyways');
        injectScript(scriptData.data,configs.callback);
      }
    }
    else{
      if(!url){
        console.log("Please supply a url to be fetched");
      }
      else {
        console.log("Fetching script");
        fetchScript(configs.url);
      }
    }
  }
  
  var fetchScript = function(url){

    $.getScript(url)
      .done(function(data,status){
        if(configs.callback)configs.callback();
        console.timeEnd('Fetch Templates');
        setLocalStoreData(configs.key,data);
    });
    
  }

  var getLocalStoreData = function(key){
    var data = localStorage.getItem(key);
    return JSON.parse(data);
  }

  var setLocalStoreData = function(key,data){
    var stringifyData  = JSON.stringify({cacheBuster:configs.cacheBuster,data:data});
    localStorage.setItem(key,stringifyData);
  }

  var injectScript = function( obj,callback ) {
    var script = document.createElement('script');
    script.defer = true;
    script.text = obj;
    head.appendChild( script );
    console.timeEnd('Fetch Templates');
    if(callback) callback();

  };

  window.scriptsinlocal  = {
    require       : require,
    getLocalStoreData : getLocalStoreData
  };
})(window,document,localStorage);