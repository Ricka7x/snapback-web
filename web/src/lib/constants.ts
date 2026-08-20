export const LATEST_VERSION = "0.43.1";
export const DISCOUNT_SOLD_OUT = true;
export const DOWNLOAD_URL = `/releases/Snapback-${LATEST_VERSION}.dmg`;
export const PRO_PURCHASE_URL = "https://store.snapbackapp.com/checkout/buy/83715b0a-448b-4e25-80d2-b2e6203c713e";
// Flip to true when Pro launches to switch the /pro page from waitlist to live purchase UI.
export const PRO_AVAILABLE = true;
export const PRO_PRICE = DISCOUNT_SOLD_OUT ? "$9.99" : "$7.49";
