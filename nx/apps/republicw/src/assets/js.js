var thisWindow = (function() {
    return {
      closeIt: function(){
        //window.open('','_parent','');
        window.close();
      }
    }
  
  })(thisWindow||{})