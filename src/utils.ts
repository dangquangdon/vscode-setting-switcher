import * as fs from "fs";
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
      checkAndCreateFile(fullPath);
    } else {
      const currentContent: string = fs.readFileSync(fullPath, "utf-8");
      console.log(jsonSettings);
      const settings: object = !currentContent
        ? {}
        : JSON.parse(currentContent);

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
    }
  } catch (err) {
    console.log(err);
  }
};

const checkAndCreateFile = (fileName: string, content: string = ""): void => {
  try {
    fs.writeFileSync(fileName, content);
  } catch (err) {
    console.log(err);
  }
};
