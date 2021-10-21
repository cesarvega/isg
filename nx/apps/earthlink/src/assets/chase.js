//This function encrypts
//returns encrypted card number (if successful) and code
var paymentTechEncrypt = (function(ccNumber, cvv) {
  return {
    card: function(ccNumber, cvv){
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
})(paymentTechEncrypt||{})
