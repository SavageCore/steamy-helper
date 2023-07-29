
// ==UserScript==
// @namespace		savagecore.uk
// @downloadURL		https://github.com/SavageCore/steamy-helper/raw/main/dist/steamy-helper.user.js
// @updateURL		https://github.com/SavageCore/steamy-helper/raw/main/dist/steamy-helper.user.js
// @match			https://steamcommunity.com/id/*/myworkshopfiles/?appid=*&browsesort=mysubscriptions
// @name			steamy-helper
// @version			0.1.0
// @description		This userscript adds import/export functionality to your subscribed mods list on the Steam Workshop.
// @author			SavageCore
// @homepage		https://github.com/SavageCore/steamy-helper#readme
// @license			Unlicense
//
// Created with love using Gorilla
// ==/UserScript==

(function () {
  'use strict';

  // Add a import and export buttons
  const targetElements = document.querySelectorAll('.menu_panel');

  const exportButtonHtml = `
    <div class="menu_panel">
      <div class="rightSectionHolder">
        <div class="rightDetailsBlock">
          <span class="btn_grey_steamui btn_medium" id="scExportButton">
            <span>Export Subscribed</span>
          </span>
        </div>
      </div>
    </div>
    `;

  targetElements[targetElements.length - 1].insertAdjacentHTML(
    'afterend',
    exportButtonHtml
  );

  const exportModalButton = document.querySelector('#scExportButton');

  const importButtonHtml = `
    <div class="menu_panel">
      <div class="rightSectionHolder">
        <div class="rightDetailsBlock">
          <span class="btn_grey_steamui btn_medium" id="scImportButton">
            <span>Import Subscribed</span>
          </span>
        </div>
      </div>
    </div>
    `;

  targetElements[targetElements.length - 1].insertAdjacentHTML(
    'afterend',
    importButtonHtml
  );

  const importModalButton = document.querySelector('#scImportButton');

  const exportRunning = localStorage.getItem('sc_exportRunning');
  if (exportRunning) {
    const exportModalButton = document.querySelector('#scExportButton');
    exportModalButton.querySelector('span').textContent = 'Fetching...';

    const nextPageButton = document.querySelector(
      '#leftContents > div.workshopBrowsePagingWithBG > div.workshopBrowsePagingControls > a:last-child'
    );

    const text = getItemsFromPage();
    const existingText = localStorage.getItem('sc_exportText');
    if (existingText) {
      localStorage.setItem('sc_exportText', `${existingText}\n${text}`);
    } else {
      localStorage.setItem('sc_exportText', text);
    }

    if (nextPageButton) {
      setTimeout(() => {
        nextPageButton.click();
      }, 100);
    } else {
      localStorage.removeItem('sc_exportRunning');
      exportModalButton.querySelector('span').textContent = 'Export Subscribed';

      const markdownTable = generateMdTable();

      // Create modal containing the markdown table and copy button
      const modalHtml = `
        <div id="scExportModal" style="display: none; position: fixed; z-index: 99; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.4);">
          <div style="background-color: #273b52; margin: 15% auto; padding: 20px; border: 1px solid #8F98A0; width: 80%;">
            <h2>Export</h2>
            <p>Copy the JSON and share somewhere like <a href="https://gist.github.com/" target="_blank">gist</a> for others to import or you can share the Markdown below for humans to read.</p>
            <textarea id="scExportModalTextarea" style="width: 100%; height: 200px;">${markdownTable}</textarea>
            <button id="scExportModalCopyButton" style="margin-top: 10px;">Copy (JSON)</button>
            <button id="scExportModalCloseButton" style="margin-top: 10px;">Close</button>
          </div>
        </div>`;
      document.body.insertAdjacentHTML('beforeend', modalHtml);

      const modal = document.querySelector('#scExportModal');
      const copyButton = document.querySelector('#scExportModalCopyButton');
      const closeButton = document.querySelector(
        '#scExportModalCloseButton'
      );

      // Show the modal
      modal.style.display = 'block';

      // On click, copy the text
      copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(generateJson());

        copyButton.textContent = 'Copied!';
      });

      // On click, close the modal
      window.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });

      // On click, close the modal
      closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }
  }

  // On click, start the export process
  exportModalButton.addEventListener('click', () => {
    // Set a flag in localStorage to indicate we're exporting
    localStorage.setItem('sc_exportRunning', true);
    localStorage.removeItem('sc_exportText');

    // Determine if we're on the first page, if not go to the first page
    const url = location.href;
    const pageNumber = url.match(/&p=(\d+)/)[1];

    if (pageNumber > 1) {
      const newUrl = url.replace(`&p=${pageNumber}`, '&p=1');
      location.href = newUrl;
      return
    }

    exportModalButton.querySelector('span').textContent = 'Fetching...';

    const nextPageButton = document.querySelector(
      '#leftContents > div.workshopBrowsePagingWithBG > div.workshopBrowsePagingControls > a:last-child'
    );

    const text = getItemsFromPage();
    // Append text to local storage
    const existingText = localStorage.getItem('sc_exportText');
    if (existingText) {
      localStorage.setItem('sc_exportText', `${existingText}\n${text}`);
    } else {
      localStorage.setItem('sc_exportText', text);
    }

    if (nextPageButton) {
      nextPageButton.click();
    }
  });

  // On click, start the import process
  importModalButton.addEventListener('click', () => {
    const modalHtml = `
        <div id="scImportModal" style="display: none; position: fixed; z-index: 99; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.4);">
          <div style="background-color: #273b52; margin: 15% auto; padding: 20px; border: 1px solid #8F98A0; width: 80%;">
            <h2>Import</h2>
            <p>Enter your JSON from a previous export, hopefully you saved the <a href="https://gist.github.com/" target="_blank">gist</a>!</p>
            <textarea id="scImportModalTextarea" style="width: 100%; height: 200px;"></textarea>

            <button id="scImportModalButton" style="margin-top: 10px;">Import</button>
            <button id="scImportModalCloseButton" style="margin-top: 10px;">Close</button>
          </div>
        </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const modal = document.querySelector('#scImportModal');
    const importButton = document.querySelector('#scImportModalButton');
    const closeButton = document.querySelector(
      '#scImportModalCloseButton'
    );

    // Show the modal
    modal.style.display = 'block';

    // On click button, parse the markdown table and import the mods
    importButton.addEventListener('click', async () => {
      const data = document.querySelector('#scImportModalTextarea').value;

      const mods = JSON.parse(data);
      if (mods) {
        // If mods to import, show a table of them
        const modalHtml = `
          <div id="scSubscribeModal" style="display: none; position: fixed; z-index: 99; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.4);">
            <div style="background-color: #273b52; margin: 15% auto; padding: 20px; border: 1px solid #8F98A0; width: 80%;">
              <h2>Import</h2>
              <p>Click the subscribe button below to subscribe to all mods listed.</p>
              <table id="scSubscribeModalTable" style="width: 100%;"></table>
              <button id="scSubscribeModalSubscribeButton" style="margin-top: 10px;">Subscribe</button>
              <button id="scSubscribeModalCloseButton" style="margin-top: 10px;">Close</button>
            </div>
          </div>`;

        // Remove the previous modal
        document.querySelector('#scImportModalButton').removeEventListener('click', () => { });
        document.querySelector('#scImportModalCloseButton').removeEventListener('click', () => { });
        document.querySelector('#scImportModal').remove();

        // Insert the new modal
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const modal = document.querySelector('#scSubscribeModal');

        const subscribeButton = document.querySelector(
          '#scSubscribeModalSubscribeButton'
        );
        const closeButton = document.querySelector(
          '#scSubscribeModalCloseButton'
        );

        const table = document.querySelector('#scSubscribeModalTable');
        const thead = document.createElement('thead');
        table.appendChild(thead);
        const theadRow = `
          <tr>
            <th>Mod</th>
            <th>Link</th>
            <th>Subscribed</th>
          </tr>
          `;
        thead.insertAdjacentHTML('beforeend', theadRow);

        const tbody = document.createElement('tbody');
        table.appendChild(tbody);

        for (const mod of mods) {
          const [title, link] = mod;
          const tableRow = `
            <tr>
              <td>${title}</td>
              <td><a href="${link}" target="_blank">${link}</a></td>
              <td>&nbsp;</td>
            </tr>
            `;

          tbody.insertAdjacentHTML('beforeend', tableRow);
        }

        // Show the modal
        modal.style.display = 'block';

        // On click button, subscribe to the mods
        subscribeButton.addEventListener('click', async () => {
          subscribeButton.textContent = 'Subscribing...';
          subscribeButton.disabled = true;

          for (const mod of mods) {
            const [, link] = mod;
            const response = await fetch(link);
            const text = await response.text();
            const parser = new DOMParser();
            const html = parser.parseFromString(text, 'text/html');

            const subscribeButton = html.querySelector('#SubscribeItemBtn');
            if (subscribeButton) {
              const tableRow = table.querySelector(`tr > td > a[href="${link}"]`).parentNode.parentNode;
              const tableRowSubscribeColumn = tableRow.querySelector('td:last-child');

              // Check #SubscribeItemOptionSubscribed to see if we're already subscribed
              // If it has class "selected" then we're already subscribed
              const alreadySubscribed = subscribeButton.querySelector('#SubscribeItemOptionSubscribed.selected');
              if (alreadySubscribed) {
                tableRowSubscribeColumn.textContent = 'Already subscribed';
              } else {
                const appid = location.href.match(/appid=(\d+)/)[1];
                const sessionid = document.cookie.match(/sessionid=(\w+)/)[1];
                const id = link.match(/id=(\d+)/)[1];

                const subscribeResponse = await fetch('https://steamcommunity.com/sharedfiles/subscribe', {
                  headers: {
                    accept: 'text/javascript, text/html, application/xml, text/xml, */*',
                    'accept-language': 'en-GB,en;q=0.7',
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'sec-ch-ua': '"Not/A)Brand";v="99", "Brave";v="115", "Chromium";v="115"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'sec-gpc': '1',
                    'x-prototype-version': '1.7',
                    'x-requested-with': 'XMLHttpRequest'
                  },
                  referrer: `https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`,
                  referrerPolicy: 'strict-origin-when-cross-origin',
                  body: `id=${id}&appid=${appid}&sessionid=${sessionid}`,
                  method: 'POST',
                  mode: 'cors',
                  credentials: 'include'
                });

                if (subscribeResponse.status === 200) {
                  tableRowSubscribeColumn.textContent = '✓ Subscribed';
                }
              }
            }
          }

          subscribeButton.textContent = 'Subscribed!';
          subscribeButton.disabled = false;
        });

        // On click outside, close the modal
        window.addEventListener('click', (event) => {
          if (event.target === modal) {
            modal.style.display = 'none';
          }
        });

        // On click button, close the modal
        closeButton.addEventListener('click', () => {
          modal.style.display = 'none';
        });
      }
    });

    // On click outside, close the modal
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });

    // On click button, close the modal
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  });

  function getItemsFromPage () {
    const items = document.querySelectorAll('.workshopItemSubscription');
    let text = '';
    for (const item of items) {
      const dataPanel = item.getAttribute('data-panel');
      if (dataPanel) {
        const title = item.querySelector('.workshopItemTitle').textContent;
        const link = item.querySelector(
          '.workshopItemPreviewHolderFloatLeft > a'
        ).href;
        text += `${title}\t${link}\n`;
      }
    }

    return text.trim()
  }

  function generateMdTable () {
    const allItems = localStorage.getItem('sc_exportText');
    let markdownTable = 'Generated using [Steamy helper](https://github.com/SavageCore/steamy-helper)\n\n';
    markdownTable += '| Mod | Link |\n|:---:|:---:|\n';
    markdownTable += allItems
      .split('\n')
      .map((item) => {
        const [title, link] = item.split('\t');
        return `| ${title} | ${link} |`
      })
      .join('\n');

    return markdownTable
  }

  function generateJson () {
    const allItems = localStorage.getItem('sc_exportText');
    const array = allItems
      .split('\n')
      .map((item) => {
        return item.split('\t')
      });

    return JSON.stringify(array)
  }

})();
