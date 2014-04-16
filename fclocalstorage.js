(function(window,document,localStorage){

  var head = document.head || document.getElementsByTagName('head')[0];

  var require = function(url,key,cacheBurst){
    if(key) fetchScript(url,key,cacheBurst);
    else console.log("No key supplied. Key is mandatory");
  }

  var fetchScript = function(url,key,cacheBurst){
    var scriptData = getLocalStoreData(key);
    if(scriptData && !cacheBurst){
      injectScript(scriptData.data);
      console.log('script found in local Storage');
    }
    else{
      if(!url){
        console.log("Please supply a url to be fetched");
      }
      else {
        console.log("Fetching script");
        $.getScript(url)
        .done(function(data,status){
          setLocalStoreData(key,data);
        });
      }
    }
  }

  var setLocalStoreData = function(key,data){
    var stringifyData  = JSON.stringify({data:data});
    localStorage.setItem(key,stringifyData);
  }

  var injectScript = function( obj ) {
    var script = document.createElement('script');
    script.defer = true;
    script.text = obj;
    head.appendChild( script );
  };

  var getLocalStoreData = function(key){
    var data = localStorage.getItem(key);
    return JSON.parse(data);
    // injectScript( JSON.parse(data) );
  }

  window.fclocalstorage  = {
    require       : require,
    getLocalStoreData : getLocalStoreData
  };
})(window,document,localStorage);