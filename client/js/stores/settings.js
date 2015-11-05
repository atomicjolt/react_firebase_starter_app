"use strict";

import Dispatcher     from "../dispatcher";
import Constants      from "../constants";
import StoreCommon    from "./store_common";
import QueryString    from '../utils/query_string';

var _settings = {};


function loadSettings(defaultSettings){

  defaultSettings = defaultSettings || {};

  var bestValue = function(settings_prop, params_prop, default_prop){
    return defaultSettings[settings_prop] || QueryString.params()[params_prop] || default_prop;
  };

  _settings = {
    apiUrl           : bestValue('apiUrl', 'api_url', '/'),
    firebaseUrl      : defaultSettings.firebaseUrl
  };

}


// Extend Message Store with EventEmitter to add eventing capabilities
var SettingsStore = {...StoreCommon, ...{

  // Return current messages
  current(){
    return _settings;
  }

}};

// Register callback with Dispatcher
Dispatcher.register(function(payload) {

  switch(payload.action){

    case Constants.SETTINGS_LOAD:
      loadSettings(payload.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  SettingsStore.emitChange();

  return true;

});

export default SettingsStore;

