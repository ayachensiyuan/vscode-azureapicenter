// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { expect, test } from '../baseTest';
import { APICenter, Timeout, VSCode } from '../utils/constants';

test('trigger generateAPIviaCICD with Azure DevOps', async ({ workbox, createVScOperator }) => {
    const op = await createVScOperator();
    await workbox.waitForTimeout(Timeout.PREPARE_TEST);
    // wait API Center extension installed on VS Code.
    expect(await op.isSideTabItemExist(VSCode.TAB_API_CENTER)).toBeTruthy();
    await op.activeSideTab(VSCode.TAB_API_CENTER);
    // trigger command palette.
    await op.execCommandInCommandPalette(APICenter.REGISTER_API);
    // select the first option.
    await op.selectOptionByName(APICenter.CI_CD);
    // select the next option.
    await op.selectOptionByName(APICenter.AZURE_DEVOPS);
    await op.activeSideTab(VSCode.TAB_EXPLORER);
    // check result.
    expect(await op.isSideTabItemExist(APICenter.REGISTER_API_YML)).toBeTruthy();
});

test('trigger generateAPIviaCICD with GitHub', async ({ workbox, createVScOperator }) => {
    const op = await createVScOperator();
    await workbox.waitForTimeout(Timeout.PREPARE_TEST);
    // wait API Center extension installed on VS Code.
    expect(await op.isSideTabItemExist(VSCode.TAB_API_CENTER)).toBeTruthy();
    await op.activeSideTab(VSCode.TAB_API_CENTER);
    // trigger command palette.
    await op.execCommandInCommandPalette(APICenter.REGISTER_API);
    // select the first option.
    await op.selectOptionByName(APICenter.CI_CD);
    // select the next option.
    await op.selectOptionByName(APICenter.GITHUB);
    await op.activeSideTab(VSCode.TAB_EXPLORER);
    // check result.
    expect(await op.isSideTabItemExist(APICenter.REGISTER_API_YML)).toBeTruthy();
});
