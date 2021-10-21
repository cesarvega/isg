//This function encrypts
//returns encrypted card number (if successful) and code
var myExtObject = (function(ccNumber, cvv) {
  return {
    func1: function(ccNumber, cvv){
      var validated = globalThis.ValidatePANChecksum('"' + ccNumber + '"');

      var response = null;
      if( validated ){
        var encrypted = globalThis.ProtectPANandCVV('"' + ccNumber + '"', cvv, globalThis.PIE.K)
        if( encrypted && encrypted.length === 3 ){
          response = encrypted[0] + '||' + encrypted[2];
        }

      }
      return response;
    }
  }
})(myExtObject||{})

var webGlObject = (function(){
  return {
    init: function(){
      alert('initialized');
    }
  }
})(webGlObject||{})
