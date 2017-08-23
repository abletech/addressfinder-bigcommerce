// this is configured using:
//
// window.AddressFinderConfig = {
//   key: "ADDRESSFINDER_DEMO_KEY",
//   widgetOptions: {
//     byline: false
//   },
//   debug: true
// }

import BigCommercePlugin from './bigcommerce_plugin'

window.AF = window.AF || {}
window.AF.BigCommercePlugin = BigCommercePlugin

let _initPlugin = function(){
  window.AF._plugin = new AF.BigCommercePlugin({
    nzKey: window.AddressFinderConfig.key_nz || window.AddressFinderConfig.key || window.AddressFinderConfig.key_au,
    auKey: window.AddressFinderConfig.key_au || window.AddressFinderConfig.key || window.AddressFinderConfig.key_nz,
    nzWidgetOptions: window.AddressFinderConfig.nzWidgetOptions || window.AddressFinderConfig.widgetOptions || {},
    auWidgetOptions: window.AddressFinderConfig.auWidgetOptions || window.AddressFinderConfig.widgetOptions || {},
    debug: window.AddressFinderConfig.debug || false
  })
}

let s = document.createElement('script')
s.src = 'https://api.addressfinder.io/assets/v3/widget.js'
s.async = 1
s.onload = _initPlugin
document.body.appendChild(s)
