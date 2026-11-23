export const LATEST_VERSION = "0.50.1";
export const DISCOUNT_SOLD_OUT = true;
export const DOWNLOAD_URL = `https://dl.66labs.dev/Snapback/Snapback-${LATEST_VERSION}.dmg`;
export const PRO_PURCHASE_URL =
  "https://www.kelviq.com/buy/aea51331-90c3-4e6c-bd67-354f97f0d45c/?enabled=snapback-pro-upgrade&plan_identifier=snapback-pro-upgrade&charge_period=ONE_TIME";
// Flip to true when Pro launches to switch the /pro page from waitlist to live purchase UI.
export const PRO_AVAILABLE = true;
export const PRO_PRICE = DISCOUNT_SOLD_OUT ? "$9.99" : "$7.49";
