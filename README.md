# DevinCode

## Overview
DevinCode is a fully automated VS Code environment designed to enhance your development workflow. It includes advanced features for code generation, folder creation, task management, planning, terminal operations, and self-improvement through AI model integration.

## Features
- **Auto Coding**: Generate code based on user prompts.
- **Auto Folders Creating**: Automatically create folders in the workspace.
- **Auto Tasking**: Manage tasks and plan development activities.
- **Auto Terminaling**: Execute terminal commands within the VS Code integrated terminal.
- **Auto Learning and Researching**: Conduct browser-based research and learn from user interactions.
- **Self-Reinforcement Learning**: Improve the AI model based on user feedback.

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/VishwamAI/devincode.git
   cd devincode
   ```

2. **Install Dependencies**:
   Ensure you have Node.js v20 LTS installed. Use NVM to manage Node.js versions if needed.
   ```bash
   nvm install 20
   nvm use 20
   yarn install
   ```

## Usage
1. **Activate the Extension**:
   Open the VS Code command palette (Ctrl+Shift+P) and type `> Developer: Reload Window` to activate the extension.

2. **Generate Code**:
   Use the command `code-agent.generateCode` to generate code based on a user prompt.

3. **Create Folders**:
   Use the command `code-agent.createFolder` to create folders in the workspace.

4. **Conduct Research**:
   Use the command `code-agent.browserResearch` to open a browser window for research.

5. **Execute Terminal Commands**:
   Use the command `code-agent.executeTerminalCommand` to run terminal commands within the VS Code integrated terminal.

6. **Provide Feedback**:
   Use the command `code-agent.provideFeedback` to rate the usefulness of the generated code and help improve the AI model.

## Troubleshooting
If you encounter any issues while using "DevinCode", here are some common solutions:
- **Node.js version issues**: Ensure you have Node.js v20 LTS installed. Use NVM to manage Node.js versions.
- **Extension activation issues**: Make sure to reload the VS Code window after installing the extension.
- **Command not found**: Verify that the extension is activated and the commands are correctly typed.

## Detailed Usage Examples
1. **Generate Code Example**:
   Open the command palette (Ctrl+Shift+P) and type `code-agent.generateCode`. Enter a prompt like "Create a function to add two numbers in Python" and the extension will generate the corresponding code.

2. **Create Folders Example**:
   Open the command palette (Ctrl+Shift+P) and type `code-agent.createFolder`. Enter the folder name and the extension will create the folder in your workspace.

## Self-Reinforcement Learning
The AI model in "DevinCode" learns from user feedback to improve its code generation capabilities. When you provide feedback using the `code-agent.provideFeedback` command, the model updates its parameters based on the rating you provide. Over time, this helps the model generate more accurate and useful code.

## Contributing
We welcome contributions to the DevinCode project. Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-branch-name`.
5. Create a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any questions or feedback, please contact the project maintainer at [email@example.com].
