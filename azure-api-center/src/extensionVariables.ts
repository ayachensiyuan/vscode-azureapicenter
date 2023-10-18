/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AzExtTreeDataProvider, IAzExtOutputChannel } from "@microsoft/vscode-azext-utils";
import { ExtensionContext } from "vscode";
import { AzureAccountTreeItem } from "./tree/AzureAccountTreeItem";
import { OpenApiEditor } from "./tree/Editors/openApi/OpenApiEditor";

/**
 * Namespace for common variables used throughout the extension. They must be initialized in the activate() method of extension.ts
 */


export namespace ext {
    export let prefix: string = 'azureAPICenter';

    export let context: ExtensionContext;
    export let treeItem: AzureAccountTreeItem;
    export let treeDataProvider: AzExtTreeDataProvider;
    export let outputChannel: IAzExtOutputChannel;
    export let openApiEditor: OpenApiEditor;
}
