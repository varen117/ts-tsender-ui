import basicSetup from "../wallet-setup/basic.setup"
import {testWithSynpress} from  "@synthetixio/synpress"
import {MetaMask, metaMaskFixtures} from "@synthetixio/synpress/playwright"

const test = testWithSynpress(metaMaskFixtures(basicSetup))
const {expect} = test

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/TSender/);
});

test('should show the AirdropForm when connected,otherwise,not', async({ page, context, metamaskPage, extensionId }) => {
  //jump to this page
  await page.goto('/')
  //check we see "please connect wallet"
  await expect(page.getByText('please connect wallet')).toBeVisible();
  const metamask = new MetaMask(context, metamaskPage, basicSetup.walletPassword, extensionId)
  await page.getByTestId("rk-connect-button").click() //点击连接按钮
  await page.getByTestId("rk-wallet-option-io.metamask").waitFor({//等待metamask选项可见
    state: "visible",
    timeout: 30000 //因为metamask连接页面需要时间，所以需要等待3秒
  })
  await page.getByTestId("rk-wallet-option-io.metamask").click() //点击metamask选项
  await metamask.connectToDapp() //这一步将启用一个metamask

  await expect(page.getByText("Token Address")).toBeVisible();
  

});








