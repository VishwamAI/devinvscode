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

							// Update the AI model based on the feedback
							updateAIModel(feedback, context);
						}
					});
				});
			}
		});
	});
	context.subscriptions.push(provideFeedbackDisposable);
}

/**
 * Update the AI model based on user feedback.
 * @param {Object} feedback - The feedback object containing the rating and timestamp.
 */
async function updateAIModel(feedback, context) {
    const tf = require('@tensorflow/tfjs-node');
    const fs = require('fs');
    const modelPath = context.asAbsolutePath('model.json');

    // Load or create the model
    let model;
    try {
        if (fs.existsSync(modelPath)) {
            model = await tf.loadLayersModel(`file://${modelPath}`);
        } else {
            model = tf.sequential();
            model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [1] }));
            model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
            model.add(tf.layers.dense({ units: 1 }));
            model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
        }
    } catch (err) {
        console.error('Error loading or creating the model:', err);
        return;
    }

    // Prepare the training data
    const xs = tf.tensor2d([parseInt(feedback.rating)], [1, 1]);
    const ys = tf.tensor2d([parseInt(feedback.rating)], [1, 1]); // Use the rating as the target value

    // Train the model
    try {
        await model.fit(xs, ys, { epochs: 50, batchSize: 1, shuffle: true });
        // Save the updated model
        await model.save(`file://${modelPath}`);
        console.log('Model updated and saved successfully.');
    } catch (err) {
        console.error('Error training or saving the model:', err);
    }
}

function deactivate() {}

/**
 * Generate code based on the user prompt.
 * @param {string} prompt - The user prompt.
 * @returns {string} - The generated code.
 */
async function generateCodeFromPrompt(prompt, context) {
    const tf = require('@tensorflow/tfjs-node');
    const fs = require('fs');
    const modelPath = context.asAbsolutePath('model.json');

    // Load the pre-trained model
    let model;
    try {
        if (fs.existsSync(modelPath)) {
            model = await tf.loadLayersModel(`file://${modelPath}`);
        } else {
            throw new Error('Model not found. Please train the model first.');
        }
    } catch (err) {
        console.error('Error loading the model:', err);
        return `// Error loading the model: ${err.message}`;
    }

    // Prepare the input tensor
    const inputTensor = tf.tensor2d([prompt], [1, prompt.length]);

    // Generate code using the model
    let generatedCode;
    try {
        const outputTensor = model.predict(inputTensor);
        generatedCode = outputTensor.dataSync()[0];
    } catch (err) {
        console.error('Error generating code:', err);
        return `// Error generating code: ${err.message}`;
    }

    return generatedCode;
}

module.exports = {
	activate,
	deactivate
};
