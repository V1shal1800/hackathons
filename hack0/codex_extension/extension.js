const vscode = require("vscode");
const axios = require("axios");
const https = require("https");
// TODO: replace authToken with your own openAI authorization token.
const authToken = "authToken"
// TODO @nikhil @violex fix security issue before releasing to public!!!!
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// NLToCode() translates natural language into code. 
async function NLToCode() {
  editor = vscode.window.activeTextEditor;
  // Get text selection.
  const text = editor.document.getText(editor.selection);

  /*// Get authorization token from user input.
  authToken = await vscode.window.showInputBox({
    placeHolder: "Input Authorization Token",
    password: true,
  });

  while (authToken == undefined) {
    authToken = await vscode.window.showInputBox({
      placeHolder: "Input Authorization Token",
      password: true,
    });
  }
  // TODO: Validate authorization token.*/

  // Get response from Codex.
  const response = await axios.post(
    "https://api.openai.com/v1/engines/davinci-codex/completions",
    {
      prompt: text,
      temperature: 0,
      max_tokens: text.length * 5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    },
    {
      headers: {
        authorization: "Bearer " + authToken,
      },
    }
  );
  // TODO: Validate response.
  return "\n" + response.data.choices[0].text + "\n"
}

// CodeTranslation translates code into natural language steps.
async function CodeTranslation() {
  editor = vscode.window.activeTextEditor;
  // Get highlighted text.
  const text = editor.document.getText(editor.selection);

  // Get authorization token from user input.
  /*authToken = await vscode.window.showInputBox({
    placeHolder: "Input Authorization Token",
    password: true,
  });

  while (authToken == undefined) {
    authToken = await vscode.window.showInputBox({
      placeHolder: "Input Authorization Token",
      password: true,
    });
  }*/
  // TODO: Validate authorization token. 

  // Get response from codex.
  const response = await axios.post(
    "https://api.openai.com/v1/engines/davinci-codex/completions",
    {
      prompt: text,
      temperature: 0,
      max_tokens: text.length * 5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    },
    {
      headers: {
        authorization: "Bearer " + authToken,
      },
    }
  );
  // TODO: Validate response. 

  return "\n" + response.data.choices[0].text
}

async function ExplainCode() {
  editor = vscode.window.activeTextEditor;
  const text = editor.document.getText(editor.selection);

  // Get authorization token from user input.
  /*authToken = await vscode.window.showInputBox({
    placeHolder: "Input Authorization Token",
    password: true,
  });

  while (authToken == undefined) {
    authToken = await vscode.window.showInputBox({
      placeHolder: "Input Authorization Token",
      password: true,
    });
  }*/

  const response = await axios.post(
    "https://api.openai.com/v1/engines/davinci-codex/completions",
    {
      prompt: text + "\n\"\"\"\n Here's what the above code is doing:\n1.",
      temperature: 0,
      max_tokens: text.length * 4,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["\"\"\""],
    },
    {
      headers: {
        authorization: "Bearer " + authToken,
      },
    }
  );

  return "\"\"\"\n1. " + response.data.choices[0].text + "\"\"\"\n"
}

function activate(context) {
  // Register NLToCode.
  let disposable1 = vscode.commands.registerCommand(
    "extension.nLToCode",
    function () {
      // Pass in NlToCode() as 'replacement'.
      NLToCode().then(replacement => {
        // Move cursor to end of selected text.
        // TODO: May only work if text is selected from top to bottom,
        // fix it.
        const text = editor.document.getText(editor.selection);
        const position = editor.selection.active;
        var newPosition = position.with(position.line, text.length);
        var newSelection = new vscode.Selection(newPosition, newPosition);

        editor.selection = newSelection;
        editor.edit(editBuilder => {
          editBuilder.replace(editor.selection, replacement);
        });
      })
    }
  );

  // Register ExplainCode.
  let disposable2 = vscode.commands.registerCommand(
    "extension.explainCode",
    function () {
      // Pass in ExplainCode() as 'replacement'.
      ExplainCode().then(replacement => {
        // Move cursor to beginning of selected text.
        // TODO: May only work if text is selected from top to bottom,
        // fix it.
        const text = editor.document.getText(editor.selection);
        const position = editor.selection.active;
        var newPosition = position.with(position.line - text.split("\n").length + 1, 0);
        var newSelection = new vscode.Selection(newPosition, newPosition);

        // Insert 'replacement'.
        editor.selection = newSelection;
        editor.edit(editBuilder => {
          editBuilder.replace(editor.selection, replacement);
        });
      })
    }
  );
}
exports.activate = activate;

function deactivate() { }
exports.deactivate = deactivate;

module.exports = {
  activate,
  deactivate,
};
