(function($) {
    "use strict";
  
    /*==================================================================
     [ Validate ]*/
    const input = $(".validate-input .input100");
  
    $(".validate-form").on("submit", function() {
      let check = true;
      for (let i = 0; i < input.length; i++) {
        if (validate(input[i]) === false) {
          showValidate(input[i]);
          check = false;
        }
      }
      return check; // Only submit if all inputs are valid
    });
  
    $(".validate-form .input100").each(function() {
      $(this).focus(function() {
        hideValidate(this);
      });
    });
  
    function validate(inputElement) {
      if (
        $(inputElement).attr("type") === "email" ||
        $(inputElement).attr("name") === "email"
      ) {
        // Basic email pattern
        if (
          $(inputElement)
            .val()
            .trim()
            .match(
              /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
            ) == null
        ) {
          return false;
        }
      } else {
        if ($(inputElement).val().trim() === "") {
          return false;
        }
      }
      return true;
    }
  
    function showValidate(inputElement) {
      let thisAlert = $(inputElement).parent();
      $(thisAlert).addClass("alert-validate");
    }
  
    function hideValidate(inputElement) {
      let thisAlert = $(inputElement).parent();
      $(thisAlert).removeClass("alert-validate");
    }
  })(jQuery);
  