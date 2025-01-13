import * as THREE from 'three';

// DS2 animation
export const totalFrame = 5000;
export const TextComponentHeight = 500;

// DS2 consts
export const xyzProps = {
  xSteps: 6, xLength: 100, xPadding: 2.5,
  ySteps: 20, yLength: 100, yPadding: 2.5,
  zSteps: 0, zLength: 0, zPadding: 0,
  // 2001 ~ 2019:      01  , 02  , 03  , 04  , 05  , 06  , 07  , 08  , 09  , 10  , 11  , 12  , 13  , 14  , 15  , 16  , 17  , 18  , 19
  dataIncome:         [38.0, 38.0, 39.0, 40.0, 41.0, 42.0, 43.0, 45.0, 46.0, 49.0, 48.0, 47.0, 48.0, 48.0, 48.0, 48.0, 48.0, 49.0, 50.0],
  dataHappiness:      [68.2, 68.3, 68.3, 68.1, 68.1, 68.3, 68.4, 68.4, 68.6, 68.2, 67.9, 68.2, 68.4, 68.3, 67.6, 67.2, 66.9, 66.4, 66.2],
  dataChangePoint:    [43.0, 42.0, 49.0, 49.0, 53.0, 53.0, 48.0, 51.0, 58.0, 56.0, 56.0, 57.0, 64.0, 59.0, 71.0, 67.0, 62.0, 69.0, 74.0],
  dataPopBelowChange: [57.0, 55.0, 64.0, 63.0, 66.0, 63.0, 50.0, 55.0, 60.0, 60.0, 60.0, 59.0, 67.0, 61.0, 74.0, 66.0, 73.0, 72.0, 74.0],
}
export const xLength = xyzProps.xLength,    yLength = xyzProps.yLength,   zLength = xyzProps.zLength;
export const xPadding = xyzProps.xPadding,  yPadding = xyzProps.yPadding, zPadding = xyzProps.zPadding;
export const xSteps = xyzProps.xSteps,      ySteps = xyzProps.ySteps,     zSteps = xyzProps.zSteps;
export const centerPos = [-xyzProps.xLength/2, -xyzProps.yLength/2, -xyzProps.zLength/2];

export const tickLength = 0.6;
export const color_beige = new THREE.Color("rgb(248, 245, 240)");
export const color4_bright = new THREE.Color("rgb(215, 204, 206)");
export const color4_dark = new THREE.Color("rgb(134, 105, 114)");
export const color_ocean1 = new THREE.Color("rgb(125, 181, 255)");
export const color_ocean2 = new THREE.Color("rgb(140, 219, 237)");
export const color_ocean_dark = new THREE.Color("rgb(51, 60, 66)");
export const color_lineSeg = new THREE.Color("rgb(91, 63, 54)");

// DS2 overlays
export const title = `Why Happiness is Becoming
more Expensive and Out of Reach?
`
export const text1 = `We investigated the population distribution of Australia in relation to household income to see how it changed between 2009 and 2019.
`
export const text2 = `Nobel prize winning psychologist Daniel Kahneman first described the change point, where extra income begins to matter less for happiness.

In other words, money can only buy a fixed level of happiness. Presumably after this point, happiness depends on other things, such as health, leisure time, quality of friendships and close family.
`
export const text3 = `In 2009, both the median income and the change point were at around AU$48,000.
As a result of adjusting for inflation and cost-of-living increases, the change point has soared up to AU$74,000 in 2019.
At the same time, the median income has lingered at less than AU$50,000 per year.
`
export const text4 = `For a decade, the number of Australians on an income below change point has increased from around 50% to 74%.

For most Australians, the change point has been moving out of reach resulting their happiness to be sensitive to the income level.
`
export const text5 = `Australia's economy has successfully kept growth rate and stable income inequality across households. However, they have been barely adequate to cope with the growing change point.

As Australia deals with the economic after-effects of the inflation, the government and its advisers need to pay attention to not only GDP and growth, but also to keep the change point as low as possible.
`
