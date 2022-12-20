function onOpen() {
  var ui = DocumentApp.getUi()
  // Or DocumentApp or FormApp.
  ui.createMenu("GPT-3").addItem("Generate Text", "menuItem1").addToUi()
}

function menuItem1() {
  var YOUR_TOKEN = "YOUR_TOKEN_HERE"
  // Or DocumentApp or FormApp.
  var doc = DocumentApp.getActiveDocument()
  var body = doc.getBody()
  var text = body.getText()

  //DocumentApp.getUi().alert(text);
  var response = UrlFetchApp.fetch("https://api.openai.com/v1/completions", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${YOUR_TOKEN}`,
    },
    payload: JSON.stringify({
      model: "text-davinci-002",
      prompt: JSON.stringify(text),
      max_tokens: 2500,
      temperature: 0.5,
      frequency_penalty: 0.1,
      presence_penalty: 0.1,
    }),
  })
  var response = JSON.parse(response)
  //DocumentApp.getUi().alert(response);
  var result = response["choices"][0]["text"]
  //DocumentApp.getUi().alert(result);
  result = result.replace(/\n/g, "").replace(/"/g, "")
  body.appendParagraph(result)
}
