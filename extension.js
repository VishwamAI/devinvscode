/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const vscode = require('vscode');
const { exec } = require('child_process');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "code-agent" is now active!');

	registerGenerateCodeCommand(context);
	registerCreateFolderCommand(context);
	registerBrowserResearchCommand(context);
	registerExecuteTerminalCommand(context);
	registerProvideFeedbackCommand(context);
}

/**
 * Register the 'code-agent.generateCode' command.
 * @param {vscode.ExtensionContext} context
 */
function registerGenerateCodeCommand(context) {
	const disposable = vscode.commands.registerCommand('code-agent.generateCode', function () {
		try {
			vscode.window.showInformationMessage('Code generation command executed!');

			// Basic local code generation logic
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				const document = editor.document;
				const selection = editor.selection;

				// Get the user prompt from the selected text
				const userPrompt = document.getText(selection);

				// Generate code based on the user prompt
				const generatedCode = generateCodeFromPrompt(userPrompt);

				// Replace the selected text with the generated code
				editor.edit(editBuilder => {
					editBuilder.replace(selection, generatedCode);
				});
			}
		} catch (error) {
			vscode.window.showErrorMessage(`Error generating code: ${error.message}`);
		}
	});

	context.subscriptions.push(disposable);
}

/**
 * Register the 'code-agent.createFolder' command.
 * @param {vscode.ExtensionContext} context
 */
function registerCreateFolderCommand(context) {
	const createFolderDisposable = vscode.commands.registerCommand('code-agent.createFolder', function () {
		try {
			vscode.window.showInputBox({ prompt: 'Enter folder name' }).then(folderName => {
				if (folderName) {
					const workspaceFolders = vscode.workspace.workspaceFolders;
					if (workspaceFolders) {
						const workspacePath = workspaceFolders[0].uri.fsPath;
						const folderPath = vscode.Uri.file(`${workspacePath}/${folderName}`);
						vscode.workspace.fs.createDirectory(folderPath).then(() => {
							vscode.window.showInformationMessage(`Folder '${folderName}' created successfully!`);
						}).catch(error => {
							vscode.window.showErrorMessage(`Error creating folder: ${error.message}`);
						});
					} else {
						vscode.window.showErrorMessage('No workspace folder is open.');
					}
				}
			});
		} catch (error) {
			vscode.window.showErrorMessage(`Error creating folder: ${error.message}`);
		}
	});

	context.subscriptions.push(createFolderDisposable);
}

/**
 * Register the 'code-agent.browserResearch' command.
 * @param {vscode.ExtensionContext} context
 */
function registerBrowserResearchCommand(context) {
	const browserResearchDisposable = vscode.commands.registerCommand('code-agent.browserResearch', function () {
		try {
			vscode.window.showInputBox({ prompt: 'Enter URL to research' }).then(url => {
				if (url) {
					vscode.env.openExternal(vscode.Uri.parse(url)).then(() => {
						vscode.window.showInformationMessage(`Opened browser to research URL: ${url}`);
					}).catch(error => {
						vscode.window.showErrorMessage(`Error opening browser: ${error.message}`);
					});
				}
			});
		} catch (error) {
			vscode.window.showErrorMessage(`Error opening browser: ${error.message}`);
		}
	});

	context.subscriptions.push(browserResearchDisposable);
}

/**
 * Register the 'code-agent.executeTerminal' command.
 * @param {vscode.ExtensionContext} context
 */
function registerExecuteTerminalCommand(context) {
	const executeTerminalDisposable = vscode.commands.registerCommand('code-agent.executeTerminal', function () {
		try {
			vscode.window.showInputBox({ prompt: 'Enter terminal command to execute' }).then(command => {
				if (command) {
					const terminal = vscode.window.createTerminal('Code Agent Terminal');
					terminal.sendText(command);
					terminal.show();
					vscode.window.showInformationMessage(`Executed terminal command: ${command}`);
				}
			});
		} catch (error) {
			vscode.window.showErrorMessage(`Error executing terminal command: ${error.message}`);
		}
	});

	context.subscriptions.push(executeTerminalDisposable);
}

/**
 * Register the 'code-agent.provideFeedback' command.
 * @param {vscode.ExtensionContext} context
 */
function registerProvideFeedbackCommand(context) {
	const provideFeedbackDisposable = vscode.commands.registerCommand('code-agent.provideFeedback', function () {
		vscode.window.showQuickPick(['1', '2', '3', '4', '5'], { placeHolder: 'Rate the usefulness of the generated code (1-5)' }).then(rating => {
			if (rating) {
				// Log the feedback to a JSON file
				const feedback = { rating: rating, timestamp: new Date().toISOString() };
				const fs = require('fs');
				const feedbackFilePath = context.asAbsolutePath('feedback.json');
				fs.readFile(feedbackFilePath, 'utf8', (err, data) => {
					let feedbackData = [];
					if (!err && data) {
						feedbackData = JSON.parse(data);
					}
					feedbackData.push(feedback);
					fs.writeFile(feedbackFilePath, JSON.stringify(feedbackData, null, 2), 'utf8', (err) => {
						if (err) {
							vscode.window.showErrorMessage(`Error saving feedback: ${err.message}`);
						} else {
							vscode.window.showInformationMessage(`Thank you for your feedback! You rated the code ${rating}/5.`);
						}
					});
				});
			}
		});
	});
	context.subscriptions.push(provideFeedbackDisposable);
}

function deactivate() {}

/**
 * Generate code based on the user prompt.
 * @param {string} prompt - The user prompt.
 * @returns {string} - The generated code.
 */
function generateCodeFromPrompt(prompt) {
    // Placeholder for AI model integration
    // Initialize the AI model (stub)
    const aiModel = {
        generateCode: function(prompt) {
            // Placeholder logic for AI code generation
            return `// Generated code for prompt: ${prompt}\nconsole.log("This is a placeholder for generated code.");`;
        }
    };

    // The AI model will generate code based on the user prompt
    const generatedCode = aiModel.generateCode(prompt);
    return generatedCode;
}

module.exports = {
	activate,
	deactivate
};
