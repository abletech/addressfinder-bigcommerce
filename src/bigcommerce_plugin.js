
import "core-js/fn/symbol" // see https://github.com/zloirock/core-js
import "core-js/fn/symbol/iterator"
import "core-js/fn/string/includes"
import "core-js/fn/object/values"
import "core-js/fn/array/find"
import "core-js/fn/array/from"
import "core-js/fn/array/includes"
import "core-js/fn/array/map"
import "core-js/fn/array/filter"

import PageManager from "./page_manager";
import MutationManager from "./mutation_manager"
import ConfigManager from "./config_manager"

(function(d, w) {
  class BigcommercePlugin {
    constructor() {
      this._initPlugin()

      // Manages the mapping of the form configurations to the DOM. 
      this.PageManager = null

      // Manages the form configuraions, and creates any dynamic forms
      this.ConfigManager = new ConfigManager()

      // Watches for any mutations to the DOM, so we can reload our configurations when something changes.
      new MutationManager({
        mutationEventHandler: this.mutationEventHandler.bind(this),
        ignoredClass: "af_list"
      })
    }

    mutationEventHandler() {
      // When the form mutates, reload our form configurations, and reload the form helpers in the page manager.
      let addressFormConfigurations = this.ConfigManager.load()
      if (this.PageManager) {
        this.PageManager.reload(addressFormConfigurations)
      }
    }

    _initPlugin(){
    
      const widgetConfig = {
        nzKey: window.AddressFinderPlugin.key,
        auKey: window.AddressFinderPlugin.key,
        nzWidgetOptions: window.AddressFinderPlugin.nzWidgetOptions || window.AddressFinderPlugin.widgetOptions || {},
        auWidgetOptions: window.AddressFinderPlugin.auWidgetOptions || window.AddressFinderPlugin.widgetOptions || {},
        debug: window.AddressFinderPlugin.debug || false
      }

      this.PageManager = new PageManager({
        addressFormConfigurations: this.ConfigManager.load(),
        widgetConfig,
        eventToDispatch: 'change' 
      })
    
      window.AddressFinderPlugin._shopifyPlugin = this.PageManager
    }
  }

  var s = document.createElement('script')
  s.src = 'https://api.addressfinder.io/assets/v3/widget.js'
  s.async = 1
  s.onload = new BigcommercePlugin
  document.body.appendChild(s)

})(document, window)


