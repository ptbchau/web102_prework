# WEB102 Prework - Sea Monster Crowdfunding

Submitted by: Chau Phan

Sea Monster Crowfunding is a website for the company Sea Monster Crowdfunding that displays information about the games they have funded.

Time spent: 8 hours spent in total

## Required Features

The following **required** functionality is completed:

* [x] The introduction section explains the background of the company and how many games remain unfunded.
* [x] The Stats section includes information about the total contributions and dollars raised as well as the top two most funded games.
* [x] The Our Games section initially displays all games funded by Sea Monster Crowdfunding
* [x] The Our Games section has three buttons that allow the user to display only unfunded games, only funded games, or all games.

The following **optional** features are implemented:

* [x] List anything else that you can get done to improve the app functionality!
- Add a search bar for users to search a specific game: User can search for a game using multiple keywords seperated by spaces or an exact phrase (phrase between quotation marks). The search engine will match the keywords or the phrase with any games' properties (e.g., name). The current feature will apply search engine for name and description as default. Searched games will be displaced on the page. Words matching to the keywords will be highlighted.

## Video Walkthrough

Here's a walkthrough of implemented features:

<img src='https://github.com/ptbchau/web102_prework/blob/main/Prework_web102_walkthrough.gif' title='Video Walkthrough' width='40' alt='Walkthrough link from Github' />

[Imgur link](https://imgur.com/XRIkQBl)

[Imgur another link](https://imgur.com/a/9uhueRF)

<!-- Replace this with whatever GIF tool you used! -->
GIF created with [peek](https://github.com/phw/peek) for Linux.

## Notes

I encountered several challenges when implementing the search add-on feature:
- Handling edge cases where search input in quotation marks vs. multiple keywords
- Handling edge cases where multiple keywords appear in one game
- Handling uppercase and lowercase when highlighting the keywords in the results.
- Fix bugs when original GAMES_JSON was modified after highlighting the keywords in the results. Solution: using deep copy.

I also had several issues with embedding large gif file to markdown, troubleshooting issues live server extension on VSCode.

## License

    Copyright [2023] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
