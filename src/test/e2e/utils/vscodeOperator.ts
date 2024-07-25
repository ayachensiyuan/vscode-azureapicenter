// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Page } from '@playwright/test';
import { Timeout, VSCode } from '../utils/constants';

export default class VscodeOperator {
    private static instance: VscodeOperator | null = null;
    private workbox: Page;

    private constructor(workbox: Page) {
        this.workbox = workbox;
    }

    static getInstance(workbox: Page): VscodeOperator {
        if (!VscodeOperator.instance) {
            VscodeOperator.instance = new VscodeOperator(workbox);
            return VscodeOperator.instance;
        }
        return VscodeOperator.instance;
    }

    async execCommandInCommandPalette(command: string) {
        await this.workbox.keyboard.press(VSCode.CMD_PALETTE_KEY);
        await this.workbox.waitForTimeout(Timeout.CLICK_WAIT);
        const cmdPalette = await this.getCMDPalette();
        await cmdPalette.fill(command);
        await this.workbox.waitForTimeout(Timeout.CLICK_WAIT);
        await this.workbox.getByRole(VSCode.CMD_PALETTE_LIST).first().press(VSCode.ENTER);
        await this.workbox.waitForTimeout(Timeout.CLICK_WAIT);
    }

    async getCMDPalette() {
        return this.workbox.getByRole(VSCode.CMD_PALETTE, { name: VSCode.INPUT });
    }

    async selectOptionByName(option: string) {
        await this.workbox.getByRole(VSCode.CMD_PALETTE_OPTION, { name: option }).locator(VSCode.LINK).click();
        await this.workbox.waitForTimeout(Timeout.CLICK_WAIT);
    }

    async selectOptionByIndex(index: number) {
        await this.workbox.getByRole(VSCode.CMD_PALETTE_OPTION).nth(index).locator(VSCode.LINK).click();
        await this.workbox.waitForTimeout(Timeout.CLICK_WAIT);
    }

    async activeSideTab(tabName: string, timeout = Timeout.CLICK_WAIT) {
        await this.workbox.getByRole(VSCode.SIDE_TAB, { name: tabName }).locator(VSCode.LINK).click();
        await this.workbox.waitForTimeout(timeout);
    }

    async isSideTabItemExist(tabName: string) {
        return await this.workbox.getByRole(VSCode.SIDE_TAB, { name: tabName }).isVisible();
    }

    async isTreeItemExist(treeItemName: string) {
        return await this.workbox.getByRole(VSCode.TREE_ITEM, { name: treeItemName }).isVisible();
    }

    async clickTreeItem(treeItemName: string) {
        await this.workbox.getByRole(VSCode.TREE_ITEM, { name: treeItemName }).locator(VSCode.LINK).click();
        await this.workbox.waitForTimeout(Timeout.CLICK_WAIT);
    }

    async getCheckallCheckbox() {
        return await this.workbox.waitForSelector('input.quick-input-check-all[type="checkbox"]', { timeout: Timeout.SHORT_WAIT });
    }

    async checkallCheckbox() {
        await (await this.getCheckallCheckbox()).check();
        await this.workbox.waitForTimeout(Timeout.CLICK_WAIT);
        await (await this.getCMDPalette()).press(VSCode.ENTER);
        await this.workbox.waitForTimeout(Timeout.CLICK_WAIT);
    }
}
