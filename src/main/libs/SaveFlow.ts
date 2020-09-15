import * as vscode from "vscode";
import * as fs from "mz/fs";
import Flow = require("../Models/Flow");

const xml2js = require("xml2js");

export class SaveFlow {

    private workspacePath;

    constructor(workspacePath: vscode.Uri) {
        this.workspacePath = workspacePath;
    }

    public async execute(flow: Flow) {

        const flowPath = vscode.Uri.parse(flow.path);
        const openpath = flowPath && flowPath.toString() !== "Undefined" ? flowPath : this.workspacePath;
        const saveResult = await vscode.window.showSaveDialog({
                defaultUri: openpath
        });

        let splitPath = saveResult?.path.split("/");
        let setPath = splitPath?.pop();
        let index;
        if(setPath?.includes('.flow-meta.xml')){
            index = setPath.indexOf('.flow-meta.xml');
        } else if (setPath.includes('.flow-meta')) {
            index = setPath.indexOf('.flow-meta');
        } else if (setPath.includes('.xml')) {
            index = setPath.indexOf('.xml');
        }
         
        const chosenName = index ? setPath.slice(0, index) : setPath;
        flow.path = splitPath.join("/") + "/" + chosenName + '.flow-meta.xml';
        flow.processedData.Flow.label = chosenName;
        flow.processedData.Flow.interviewLabel = chosenName + ' {!$Flow.CurrentDateTime}';
        return await this.writeFlow(flow);
    }

    private async writeFlow(flow) {
        const xml = new xml2js.Builder().buildObject(flow.processedData);
        let path = flow.path;
        if (path.startsWith("/C:")) {
            path = path.substring(3, path.length);
            path = path.replace("..", ".");
        }

        await fs.writeFile(path, xml);
        return true;
    }
}
