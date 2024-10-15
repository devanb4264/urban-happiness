$(document).ready(function() {
  // Function to convert text using Caesar cipher
  function caesarCipher(text, shift) {
      var result = '';
      for (var i = 0; i < text.length; i++) {
          var char = text.charAt(i);
          if (char.match(/[a-z]/i)) { // Check if it's a letter
              var code = text.charCodeAt(i);
              // Shift uppercase letters
              if (char === char.toUpperCase()) {
                  result += String.fromCharCode(((code - 65 + shift) % 26) + 65);
              } else {
                  // Shift lowercase letters
                  result += String.fromCharCode(((code - 97 + shift) % 26) + 97);
              }
          } else {
              result += char;
          }
      }
      return result;
  }

  // Event listener for convert button
  $('#convertBtn').click(function() {
      var inputText = $('#textInput').val().trim();
      if (inputText !== '') {
          var shift = 3; // Change this value for different shifts
          var outputText = caesarCipher(inputText, shift);
          
          $('#convertedText').val(outputText);
          $('#conversionForm').submit();
      }
  });
