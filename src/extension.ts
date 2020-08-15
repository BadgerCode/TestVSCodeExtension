// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { NodeDependenciesProvider } from './NodeDependenciesProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "testextension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('testextension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello VS Code from TestExtension! Woop woop');
	});

	context.subscriptions.push(disposable);



	let anotherCommand = vscode.commands.registerCommand('testextension.anotherCommand', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('This is another command!');

		// Prompt the user for some information
		vscode.window.showInputBox({ prompt: 'Enter something please' })
			.then(response => {
				vscode.window.showInformationMessage(`You said: ${response}`);
			});
	});

	context.subscriptions.push(anotherCommand);



	const nodeDependenciesProvider = new NodeDependenciesProvider(vscode.workspace.rootPath);
	vscode.window.registerTreeDataProvider('nodeDependencies', nodeDependenciesProvider);
	vscode.window.registerTreeDataProvider('nodeDependenciesSideBar', nodeDependenciesProvider);
	vscode.commands.registerCommand('nodeDependencies.refreshEntry', () => nodeDependenciesProvider.refresh());
}

// this method is called when your extension is deactivated
export function deactivate() { }
