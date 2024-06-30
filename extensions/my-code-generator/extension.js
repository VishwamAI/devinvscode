/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const vscode = require('vscode');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');

let model;

async function activate(context) {
    // Load or create the AI model
    model = await loadOrCreateModel();

    // Register the generateCode command
    const disposable = vscode.commands.registerCommand('code-agent.generateCode', async () => {
        const prompt = await vscode.window.showInputBox({ prompt: 'Enter your code prompt' });
        if (prompt) {
            const generatedCode = await generateCodeFromPrompt(prompt);
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const document = editor.document;
                const position = editor.selection.active;
                editor.edit(editBuilder => {
                    editBuilder.insert(position, generatedCode);
                });
            }
        }
    });

    // Register the createFolder command
    const createFolderDisposable = vscode.commands.registerCommand('code-agent.createFolder', async () => {
        const folderName = await vscode.window.showInputBox({ prompt: 'Enter the folder name' });
        if (folderName) {
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (workspaceFolders) {
                const workspacePath = workspaceFolders[0].uri.fsPath;
                const folderPath = path.join(workspacePath, folderName);
                fs.mkdirSync(folderPath);
                vscode.window.showInformationMessage(`Folder '${folderName}' created successfully.`);
            }
        }
    });

    // Register the provideFeedback command
    const provideFeedbackDisposable = vscode.commands.registerCommand('code-agent.provideFeedback', async () => {
        const feedback = await vscode.window.showInputBox({ prompt: 'Provide your feedback (1-5)' });
        if (feedback) {
            const feedbackValue = parseInt(feedback);
            if (feedbackValue >= 1 && feedbackValue <= 5) {
                await updateAIModel(feedbackValue);
                vscode.window.showInformationMessage('Thank you for your feedback!');
            } else {
                vscode.window.showErrorMessage('Feedback must be a number between 1 and 5.');
            }
        }
    });

    // Register the openPrompt command
    const openPromptDisposable = vscode.commands.registerCommand('code-agent.openPrompt', async () => {
        const prompt = await vscode.window.showInputBox({ prompt: 'Enter your prompt' });
        if (prompt) {
            vscode.window.showInformationMessage(`You entered: ${prompt}`);
        }
    });

    context.subscriptions.push(disposable, createFolderDisposable, provideFeedbackDisposable, openPromptDisposable);
}

async function loadOrCreateModel() {
    const modelPath = path.join(__dirname, 'model.json');
    if (fs.existsSync(modelPath)) {
        return await tf.loadLayersModel(`file://${modelPath}`);
    } else {
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 128, activation: 'relu', inputShape: [1] }));
        model.add(tf.layers.dense({ units: 1 }));
        model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
        return model;
    }
}

async function generateCodeFromPrompt(prompt) {
    // Integrate actual code generation logic
    // For demonstration purposes, we'll use a simple template-based approach
    const codeTemplates = {
        "hello world": `console.log('Hello, world!');`,
        "sum function": `function sum(a, b) { return a + b; }`,
        "factorial function": `function factorial(n) { if (n <= 1) return 1; return n * factorial(n - 1); }`
    };

    return codeTemplates[prompt.toLowerCase()] || `// Generated code for prompt: ${prompt}\n`;
}

async function updateAIModel(feedbackValue) {
    // Placeholder function for updating the AI model based on feedback
    // Replace this with actual model training logic
    const xs = tf.tensor2d([feedbackValue], [1, 1]);
    const ys = tf.tensor2d([feedbackValue], [1, 1]);
    await model.fit(xs, ys, { epochs: 1 });
    await model.save(`file://${path.join(__dirname, 'model.json')}`);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
