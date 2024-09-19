// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Page } from '@playwright/test';
import { expect, test } from '../baseTest';
import { Timeout, VSCode } from '../utils/constants';
import VscodeOperator from '../utils/vscodeOperator';

test('Open API Documentation test', async ({ workbox, electronApp }) => {
    console.log("[start] Open API Documentation test");
    //set test timeout
    test.setTimeout(120000);

    await workbox.waitForTimeout(Timeout.PREPARE_TEST);
    const nw = await electronApp.waitForEvent("window", {
        timeout: 20000
    });
    console.log("nw: ", nw);
});
