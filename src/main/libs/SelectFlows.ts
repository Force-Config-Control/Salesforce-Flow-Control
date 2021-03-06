import * as vscode from "vscode";

export class SelectFlows {

    private message: string;
    constructor(rootPath: vscode.Uri, message: string) {
        this.message = message;
    }

    public async execute(initialPath: vscode.Uri) {
        vscode.window.showInformationMessage(this.message);

        let selectedFlows;
        selectedFlows = await vscode.window.showOpenDialog({
            canSelectFiles: true,
            canSelectFolders: false,
            canSelectMany: true,
            defaultUri: initialPath,
            filters: {
                'Flow': ['flow-meta.xml']
            }
        });
        return selectedFlows;
    }

}
