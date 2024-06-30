# DevinCode Test Plan

## Overview
This test plan is designed to validate the functionalities of the "DevinCode" editor, ensuring that all automation features are working as expected. The tests will cover code generation, folder creation, task management, planning, terminal operations, and self-improvement through AI model integration.

## Prerequisites
- Ensure you have Node.js v20 LTS installed. Use NVM to manage Node.js versions if needed.
- Clone the repository and install dependencies:
  ```bash
  git clone https://github.com/VishwamAI/devincode.git
  cd devincode
  nvm install 20
  nvm use 20
  yarn install
  ```

## Test Cases

### 1. Activate the Extension
1. Open the VS Code command palette (Ctrl+Shift+P).
2. Type `> Developer: Reload Window` to activate the extension.
3. Verify that the message "Congratulations, your extension 'code-agent' is now active!" appears in the console.

### 2. Generate Code
1. Open the VS Code command palette (Ctrl+Shift+P).
2. Type `code-agent.generateCode`.
3. Enter a prompt like "Create a function to add two numbers in Python".
4. Verify that the generated code appears in the editor and matches the prompt.

### 3. Create Folders
1. Open the VS Code command palette (Ctrl+Shift+P).
2. Type `code-agent.createFolder`.
3. Enter a folder name.
4. Verify that the folder is created in the workspace and a success message is displayed.

### 4. Conduct Research
1. Open the VS Code command palette (Ctrl+Shift+P).
2. Type `code-agent.browserResearch`.
3. Enter a URL to research.
4. Verify that the URL opens in the default web browser and a success message is displayed.

### 5. Execute Terminal Commands
1. Open the VS Code command palette (Ctrl+Shift+P).
2. Type `code-agent.executeTerminalCommand`.
3. Enter a terminal command (e.g., `echo "Hello, world!"`).
4. Verify that the command is executed in the integrated terminal and the output is displayed.

### 6. Provide Feedback
1. Open the VS Code command palette (Ctrl+Shift+P).
2. Type `code-agent.provideFeedback`.
3. Select a rating from 1 to 5.
4. Verify that the feedback is logged to the `feedback.json` file and a success message is displayed.
5. Verify that the AI model is updated based on the feedback.

## Troubleshooting
If you encounter any issues while using "DevinCode", here are some common solutions:
- **Node.js version issues**: Ensure you have Node.js v20 LTS installed. Use NVM to manage Node.js versions.
- **Extension activation issues**: Make sure to reload the VS Code window after installing the extension.
- **Command not found**: Verify that the extension is activated and the commands are correctly typed.

## Conclusion
This test plan covers the core functionalities of the "DevinCode" editor. Please execute these tests in your local environment to validate the features and ensure that the editor operates as expected. If any issues are found, please report them for further investigation and resolution.
