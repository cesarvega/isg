//This function encrypts
//returns encrypted card number (if successful) and code
var myExtObject = (function(ccNumber, cvv) {
  return {
    func1: function(ccNumber, cvv, k){
      this.ValidatePANChecksum(ccNumber, cvv, k);
      console.log(ccNumber, cvv)
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

//     if( typeof this.window.ProtectPANandCVV === 'function' ){
//         alert('function found');
//     }
//   if (is_pie_encryption_download_error() || is_pie_key_download_error()){
//     console.log({user_id: user.id, error: 'cant load encryption js'}, 'payments_log', 'payments/credit_card/chase/tokenization/encrypting_card/failure')
//     console.log({user_id: user.id, error: 'cant load encryption js'}, 'payments_log', 'payments/chase/javascript_failure')
//     card.code = 2
// }
//   if (!ValidatePANChecksum(ccNumber)){
//     //Check MOD 10 digit, since PIE embedded encryption requires that the MOD 10 checksum is valid.
//     console.log({user_id: user.id, error: 'credit card number invalid checksum'}, 'payments_log', 'payments/credit_card/chase/tokenization/encrypting_card/failure')
//     card.code = 2
// }
//   //returns encrypted cc number, encrypted cvv and integrity check value
//   response = ProtectPANandCVV(ccNumber, cvv, !embed)

//   if (response != null && cvv.match(/^[0-9]{3,4}$/) != null){
//     console.log({user_id: user.id, response: response}, 'payments_log', 'payments/credit_card/chase/tokenization/encrypting_card/success')
//     card.code = 0
//     payment_provider.options.embed_encryption = embed
//     payment_provider.options.key = PIE.key_id
//     payment_provider.options.phase = PIE.phase
//     payment_provider.options.integrity_check = response[2]
//     payment_provider.provider = 'chase'
//     card.cc_number = response[0].replace(/\D/g,'')
//     card.cvv = response[1]
//     card.credit_card_tokens_attributes = [payment_provider]
//   }else{
//     console.log({user_id: user.id, response: response, error: 'invalid cc or cvv'}, 'payments_log', 'payments/credit_card/chase/tokenization/encrypting_card/failure')
//     card.code = 1
//   }
