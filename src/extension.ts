import * as vscode from "vscode";
import { checkAndCreateSettings } from "./utils";

// this method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "settings-switcher" is now active!',
  );

  const root = vscode.workspace.rootPath;
  const settingPath = root + "/.vscode";
  const settingFile = "settings.json";

  // use javascript settings
  context.subscriptions.push(
    vscode.commands.registerCommand("settings-switcher.toJS", () => {
      checkAndCreateSettings(settingPath, settingFile, "javascript");
    }),
  );

  // use python settings
  context.subscriptions.push(
    vscode.commands.registerCommand("settings-switcher.toPy", () => {
      checkAndCreateSettings(settingPath, settingFile, "python");
    }),
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
