export const LATEST_VERSION = "0.50.1";
export const DISCOUNT_SOLD_OUT = true;
export const DOWNLOAD_URL = `https://dl.66labs.dev/Snapback/Snapback-${LATEST_VERSION}.dmg`;
export const PRO_PURCHASE_URL =
  "https://www.kelviq.com/buy/aea51331-90c3-4e6c-bd67-354f97f0d45c/?enabled=snapback-pro-upgrade&plan_identifier=snapback-pro-upgrade&charge_period=ONE_TIME";
// Black Friday 2026: 40% off Snapback Pro with code BF2026. Every Black Friday element on the
// site turns itself off at BLACK_FRIDAY_END (Mon Nov 30, 11:59 pm Central), so nothing needs
// removing by hand. Keep this in step with the discount's end date in the Kelviq dashboard.
export const BLACK_FRIDAY_CODE = "BF2026";
export const BLACK_FRIDAY_END = new Date("2026-12-01T05:59:59Z");
// The price Kelviq's checkout shows once BF2026 is applied (checked 2026-11-24).
export const BLACK_FRIDAY_PRICE = "$5.99";
export const BLACK_FRIDAY_PURCHASE_URL = `${PRO_PURCHASE_URL}&discounts_enabled=true&discount_code=${BLACK_FRIDAY_CODE}`;
// Flip to true when Pro launches to switch the /pro page from waitlist to live purchase UI.
export const PRO_AVAILABLE = true;
export const PRO_PRICE = DISCOUNT_SOLD_OUT ? "$9.99" : "$7.49";
