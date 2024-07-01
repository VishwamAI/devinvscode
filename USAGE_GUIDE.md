# Usage Guide

## Overview
This guide provides instructions on how to use the "DevinCode" editor, including installation, usage of new features, and understanding the GitHub Actions workflow.

## Installation

### Prerequisites
- Node.js v20 LTS
- Yarn package manager

### Steps
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

4. Launch the editor:
   ```bash
   yarn start
   ```

## Features

### Auto Coding
- **Description**: Automatically generate code based on user prompts.
- **Usage**:
  - Use the command palette and select `DevinCode: Generate Code from Prompt`.
  - Enter your prompt, and the editor will generate the corresponding code snippet.

### Folder Creation
- **Description**: Automatically create project folders and organize files.
- **Usage**:
  - Use the command palette and select `DevinCode: Create Project Folders`.
  - The editor will generate a predefined folder structure.

### Task Management
- **Description**: Automate task creation and tracking within the editor.
- **Usage**:
  - Use the command palette and select `DevinCode: Manage Tasks`.
  - Add, update, or delete tasks as needed.

### Planning
- **Description**: Assist users in planning their projects and tasks.
- **Usage**:
  - Use the command palette and select `DevinCode: Plan Project`.
  - Create and manage project plans.

### Terminal Operations
- **Description**: Automate terminal commands and operations.
- **Usage**:
  - Use the command palette and select `DevinCode: Execute Terminal Command`.
  - Define and execute custom terminal commands.

### Self-Improvement
- **Description**: Use self-reinforcement learning to improve the AI model over time.
- **Usage**:
  - Use the command palette and select `DevinCode: Provide Feedback`.
  - Provide feedback to help improve the AI model.

### Open Prompt
- **Description**: Open a prompt when pressing Ctrl+I.
- **Usage**:
  - Press Ctrl+I to open a prompt.
  - Enter your input, and the editor will display the entered text.

## GitHub Actions Workflow
A GitHub Actions workflow has been added to the project. This workflow is triggered on push and pull request events and includes the following steps:
- Set up Node.js
- Install dependencies
- Compile the code
- Run tests
- Package the application
- Upload the resulting `.deb` package as an artifact

The workflow file is located at `.github/workflows/main.yml`.

## Hugging Face Integration
A directory named `huggingface_integration` has been created within the project workspace to manage resources or repositories from Hugging Face. Further instructions will be provided for integrating specific Hugging Face resources into the "DevinCode" editor.

## Conclusion
This guide provides an overview of the "DevinCode" editor's features, installation steps, and usage instructions. For more detailed information, please refer to the project's README.md and CONTRIBUTING.md files.
