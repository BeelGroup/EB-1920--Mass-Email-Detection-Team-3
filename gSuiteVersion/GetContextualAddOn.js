//import 'google-apps-script';

/**
 * Returns the contextual add-on data that should be rendered for
 * the current e-mail thread. This function satisfies the requirements of
 * an 'onTriggerFunction' and is specified in the add-on's manifest.
 *
 * @param {Object} event Event containing the message ID and other context.
 * @returns {Card[]}
 */
function getContextualAddOn(e) {
  
  var accessToken = e.messageMetadata.accessToken;
  GmailApp.setCurrentMessageAccessToken(accessToken);
  
  var messageId = e.messageMetadata.messageId;
  var message = GmailApp.getMessageById(messageId);
  var emailBody = message.getPlainBody();
  
  hashedEmailBody = MD5(removeWhiteSpace(removeNouns(emailBody)));
  
  //check if mass email -> helpers as before
  
  //give a string to builder to display yes / no
  var numOtherUsersGotEmail = checkHashPresent(hashedEmailBody);
  var result = "yes";
  
  var card = createMassEmailCard(numOtherUsersGotEmail,result);

  return card;
}

/**
 * Retrieves the current message given an action event object.
 * @param {Event} event Action event object
 * @return {Message}
 */
function getCurrentMessage(event) {
  var accessToken = event.messageMetadata.accessToken;
  var messageId = event.messageMetadata.messageId;
  GmailApp.setCurrentMessageAccessToken(accessToken);
  return GmailApp.getMessageById(messageId);
}