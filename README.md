# Steamy Helper

> This userscript adds import/export functionality to your subscribed mods list
> on the Steam Workshop.

![brave_y9eoeFTpjB](https://github.com/SavageCore/steamy-helper/assets/171312/699e4099-4f32-4e22-bf69-6c4ba2982ade)

![brave_ztjg0UMTR7](https://github.com/SavageCore/steamy-helper/assets/171312/92a59f38-6447-4f6d-92a8-dc66e23ef4f0)

![JcqOHzFpEJ](https://github.com/SavageCore/steamy-helper/assets/171312/32fa3e0c-5e91-4d4d-9b75-c3424ee6794e)

## Installation

1. Install a userscript manager like [Greasemonkey](https://www.greasespot.net/)
   or [Violentmonkey](https://violentmonkey.github.io/).
2. Click
   [here](https://github.com/SavageCore/steamy-helper/raw/main/dist/steamy-helper.user.js)
   to install the script.

## Usage

1. Visit your subscriptions page ([Workshop](https://steamcommunity.com/app/289070/workshop/) -> Your files -> Your subscribed items

### Exporting
1. Click Export Subscribed and wait for the pop-up
2. Click copy JSON and save it somewhere like [gist](https://gist.github.com) for sharing/backup.

### Importing
1. Click Import Subscribed
2. Paste in your previously exported JSON
3. Click Import
4. Scroll to the bottom and click Subscribe

## Features

- Export your subscribed mods list as a Markdown table and also as JSON.
- Import a list of mods from a JSON file.

Example table:
([UrsaRyan's](https://www.youtube.com/channel/UCCEBBOJXdQ3lwoCtYkCnIRQ) mods)

|                   Mod                    |                               Link                                |
| :--------------------------------------: | :---------------------------------------------------------------: |
|     Better Builder Charges Tracking      | https://steamcommunity.com/sharedfiles/filedetails/?id=2409116842 |
|        Better Climate Screen (UI)        | https://steamcommunity.com/sharedfiles/filedetails/?id=2114277246 |
|            Better Deal Window            | https://steamcommunity.com/sharedfiles/filedetails/?id=2066679333 |
|         Better Espionage Screen          | https://steamcommunity.com/sharedfiles/filedetails/?id=872296228  |
|        Better Report Screen (UI)         | https://steamcommunity.com/sharedfiles/filedetails/?id=1312585482 |
|           Better Trade Screen            | https://steamcommunity.com/sharedfiles/filedetails/?id=873246701  |
|            Better Unit Flags             | https://steamcommunity.com/sharedfiles/filedetails/?id=2057539865 |
|             Better Unit List             | https://steamcommunity.com/sharedfiles/filedetails/?id=1618650715 |
|           Colorized Fog Of War           | https://steamcommunity.com/sharedfiles/filedetails/?id=2130256810 |
|        Colorized Historic Moments        | https://steamcommunity.com/sharedfiles/filedetails/?id=1679150838 |
|           Detailed Appeal Lens           | https://steamcommunity.com/sharedfiles/filedetails/?id=2553831629 |
|            Detailed Map Tacks            | https://steamcommunity.com/sharedfiles/filedetails/?id=2428969051 |
|             Enhanced Camera              | https://steamcommunity.com/sharedfiles/filedetails/?id=2484412297 |
|           Enhanced Mod Manager           | https://steamcommunity.com/sharedfiles/filedetails/?id=1601259406 |
|             Envoy Quest List             | https://steamcommunity.com/sharedfiles/filedetails/?id=2533189420 |
|        Extended Diplomacy Ribbon         | https://steamcommunity.com/sharedfiles/filedetails/?id=1360462633 |
|          Extended Policy Cards           | https://steamcommunity.com/sharedfiles/filedetails/?id=2266952591 |
|            Great Works Viewer            | https://steamcommunity.com/sharedfiles/filedetails/?id=1652106496 |
|             Greatest Cities              | https://steamcommunity.com/sharedfiles/filedetails/?id=2494925002 |
|     Happiness and Growth Indicators      | https://steamcommunity.com/sharedfiles/filedetails/?id=1332994668 |
|               More Lenses                | https://steamcommunity.com/sharedfiles/filedetails/?id=871712879  |
|  Prismatic - Color and Jersey Overhaul   | https://steamcommunity.com/sharedfiles/filedetails/?id=1661785509 |
|               Quick Deals                | https://steamcommunity.com/sharedfiles/filedetails/?id=2460661464 |
|   Quick Deals - Open Borders Extension   | https://steamcommunity.com/sharedfiles/filedetails/?id=2943812276 |
|          Radial Measuring Tool           | https://steamcommunity.com/sharedfiles/filedetails/?id=1628605090 |
|          Real Era Tracker (UI)           | https://steamcommunity.com/sharedfiles/filedetails/?id=1699006932 |
|          Real Great People (UI)          | https://steamcommunity.com/sharedfiles/filedetails/?id=900089445  |
|            Real Strategy (AI)            | https://steamcommunity.com/sharedfiles/filedetails/?id=1617282434 |
|              Repeat Project              | https://steamcommunity.com/sharedfiles/filedetails/?id=1505351262 |
|     Sukritact's Civ Selection Screen     | https://steamcommunity.com/sharedfiles/filedetails/?id=893502507  |
|    Sukritact's Global Relations Panel    | https://steamcommunity.com/sharedfiles/filedetails/?id=1753346735 |
|    Sukritact's Simple UI Adjustments     | https://steamcommunity.com/sharedfiles/filedetails/?id=939149009  |
|              TCS Pedialite               | https://steamcommunity.com/sharedfiles/filedetails/?id=2126042977 |
|           Tech Civic Progress            | https://steamcommunity.com/sharedfiles/filedetails/?id=2243611623 |
|          Unique District Icons           | https://steamcommunity.com/sharedfiles/filedetails/?id=882664162  |
| Vibrant Waters (Prettier Water Textures) | https://steamcommunity.com/sharedfiles/filedetails/?id=1472662589 |

## Development

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. `npm run build` to build the script.
4. `npm run watch` to watch for changes and rebuild the script.
5. `npm run lint` to lint the code.
