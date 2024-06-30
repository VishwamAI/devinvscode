# DevinCode - Fully Automated Code Editor

## Overview
DevinCode is a fully automated code editor similar to Visual Studio Code, designed to enhance developer productivity with advanced features for auto coding, folder creation, task management, planning, terminal operations, and self-improvement through AI model integration. DevinCode supports any programming language and incorporates self-reinforcement learning to improve based on user interactions and feedback.

## Features

### 1. Auto Coding
- **Description**: Automatically generate code based on user prompts.
- **Implementation**:
  - Integrate an AI model for code generation.
  - Create a command to accept user prompts and generate code snippets.
  - Display the generated code in the editor.

### 2. Folder Creation
- **Description**: Automatically create project folders and organize files.
- **Implementation**:
  - Create a command to generate a predefined folder structure.
  - Allow customization of folder templates.

### 3. Task Management
- **Description**: Automate task creation and tracking within the editor.
- **Implementation**:
  - Integrate a task management system.
  - Create commands to add, update, and delete tasks.
  - Display tasks in a dedicated panel.

### 4. Planning
- **Description**: Assist users in planning their projects and tasks.
- **Implementation**:
  - Integrate a planning tool.
  - Create commands to create and manage project plans.
  - Display plans in a dedicated panel.

### 5. Terminal Operations
- **Description**: Automate terminal commands and operations.
- **Implementation**:
  - Create commands to execute common terminal operations.
  - Allow users to define custom terminal commands.
  - Display terminal output within the editor.

### 6. Self-Improvement
- **Description**: Use self-reinforcement learning to improve the AI model over time.
- **Implementation**:
  - Integrate TensorFlow.js for self-reinforcement learning.
  - Create a feedback mechanism to collect user ratings.
  - Update the AI model based on user feedback.

## Getting Started

### Prerequisites
- Node.js v20 LTS
- Yarn package manager

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/VishwamAI/devincode.git
   cd devincode
   ```

2. Install dependencies:
   ```bash
   yarn install --ignore-scripts
   ```

3. Compile the editor:
   ```bash
   yarn compile
   ```

### Usage
1. Launch the editor:
   ```bash
   yarn start
   ```

2. Use the command palette to access the automation features:
   - `DevinCode: Generate Code from Prompt`
   - `DevinCode: Create Project Folders`
   - `DevinCode: Manage Tasks`
   - `DevinCode: Plan Project`
   - `DevinCode: Execute Terminal Command`
   - `DevinCode: Provide Feedback`
   - `DevinCode: Open Prompt`

## GitHub Actions Workflow
A basic GitHub Actions workflow has been added to the project. This workflow is triggered on push and pull request events and currently contains a single job that checks out the code and runs a simple echo command. The workflow file is located at `.github/workflows/main.yml`.

## Hugging Face Integration
A directory named `huggingface_integration` has been created within the project workspace to manage resources or repositories from Hugging Face. Further instructions will be provided for integrating specific Hugging Face resources into the "DevinCode" editor.

## Contributing
We welcome contributions to improve DevinCode. Please follow the guidelines in the `CONTRIBUTING.md` file.

## License
DevinCode is licensed under the MIT License. See the `LICENSE.txt` file for more information.
