// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { expect, test } from '../baseTest';
import { APICenter, TestENV, Timeout, VSCode } from '../utils/constants';

test('select Tenant', async ({ workbox, createVScOperator }) => {
    const op = await createVScOperator();
    await workbox.waitForTimeout(Timeout.PREPARE_TEST);
    // wait API Center extension installed on VS Code.
    expect(await op.isSideTabItemExist(VSCode.TAB_API_CENTER)).toBeTruthy();
    await op.activeSideTab(VSCode.TAB_API_CENTER, Timeout.PREPARE_EXT);
    // select tenant
    expect(await op.isTreeItemExist(APICenter.SELECT_TENANT)).toBeTruthy();
    await op.clickTreeItem(APICenter.SELECT_TENANT);
    await op.selectOptionByName(TestENV.AZURE_TENANT_NAME!);
    // check subscription
    const isSelectSubsExist = await op.isTreeItemExist(APICenter.SELECT_SUBS);
    if (isSelectSubsExist) {
        // select subscription check all
        await op.clickTreeItem(APICenter.SELECT_SUBS);
        await op.checkallCheckbox();
    }
    expect(await op.isTreeItemExist(TestENV.AZURE_SUBSCRIPTION_NAME!)).toBeTruthy();
});
