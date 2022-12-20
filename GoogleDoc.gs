function onOpen() {
  var ui = DocumentApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Custom Menu')
      .addItem('Write me something!', 'menuItem1')
      .addToUi();
}

function menuItem1() {
   // ADD YOUR OPEN AI TOKEN HERE
   var YOUR_TOKEN = "";
   // Or DocumentApp or FormApp.
    var doc = DocumentApp.getActiveDocument();
    var body = doc.getBody();
    var text = body.getText();
    
    //DocumentApp.getUi().alert(text);
    var response = UrlFetchApp.fetch("https://api.openai.com/v1/completions", {
      "method": "post",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${YOUR_TOKEN}`
      },
      "payload": JSON.stringify({
        "model": "text-davinci-002",
        "prompt":"Continue this writing:</br> "+JSON.stringify(text)+"</br>Continuation:",
        "max_tokens":1000,
        "temperature": 0,
        "frequency_penalty":0.1,
        "presence_penalty":0.1
      })
    });
  var response = JSON.parse(response);
  //DocumentApp.getUi().alert(response);
  var result = response["choices"][0]["text"];
  //DocumentApp.getUi().alert(result);
  result = (' ' + result).replace(/([^\\])"/g, '$1\\"').slice(1)
  body.appendParagraph(JSON.stringify(result));

}
