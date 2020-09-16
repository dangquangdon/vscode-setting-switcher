import * as fs from "fs";
import * as vscode from "vscode";
import * as jsonSettings from "./data/settingsCollection.json";

export const checkAndCreateSettings = (
  fileDir: string,
  fileName: string,
  lang: string,
): void => {
  const fullPath = fileDir + "/" + fileName;
  try {
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fileDir, { recursive: true });
      // Create empty settings.json to start with
      checkAndCreateFile(fullPath);
    }
    const currentContent: string = fs.readFileSync(fullPath, "utf-8");

    const settings: object = !currentContent ? {} : JSON.parse(currentContent);

    let contentForWrite = {
      ...settings,
    };
    switch (lang) {
      case "javascript":
        contentForWrite = {
          ...jsonSettings.javascript,
        };
        break;
      case "python":
        contentForWrite = {
          ...jsonSettings.python,
        };
        break;
      default:
        break;
    }

    checkAndCreateFile(fullPath, JSON.stringify(contentForWrite));
  } catch (err) {
    vscode.window.showErrorMessage(err.message);
  }
};

const checkAndCreateFile = (fileName: string, content: string = ""): void => {
  try {
    fs.writeFileSync(fileName, content);
  } catch (err) {
    vscode.window.showErrorMessage(err.message);
  }
};
