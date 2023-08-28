var btnCloseChat = `<div class="_3OtEr hidden">
    <div aria-disabled="false" style="padding: 8px;" role="button" tabindex="0" class="_3ndVb" data-tab="2" title="Chiudi chat" aria-label="Chiudi chat">
        <span class="material-symbols-rounded icon">
            comments_disabled
        </span>
    </div>
</div>`;
var btnSearch = `<div class="_3OtEr">
    <div aria-disabled="false" style="padding: 8px;" role="button" tabindex="0" class="_3ndVb" data-tab="2" title="Cerca" aria-label="Cerca">
        <span class="material-symbols-rounded icon">
            search
        </span>
    </div>
</div>`;
var btnHolder, divSide, chatListHeader, app, chatSearchBox;


// google icons and font
const googleIcons = `
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,700,1,0" />
`;
const googleOpenSans = `
<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
`;
document.head.appendChild(stringToNode(googleIcons));
document.head.appendChild(stringToNode(googleOpenSans));


// Main
window.onload = async e => {
    // attach to nodes
    do { await new Promise (resolve => {
        setTimeout(() => {

            app = document.getElementById('app');
            side = document.getElementById('side');
            chatListHeader = document.querySelector("#app > div > div > div._2Ts6i._3RGKj > header");
            btnHolder = document.querySelector("#app header > div._604FD > div > span");
            chatSearchBox = document.querySelector("#side div.to2l77zo.gfz4du6o.ag5g9lrv.bze30y65.kao4egtt.qh0vvdkp");
            resolve();

        }, 2000);
    }) } while (btnHolder == null || btnHolder == undefined);

    //

    console.log('Doing custom stuff...');

    // add close chat button
    btnHolder.insertBefore(stringToNode(btnCloseChat), btnHolder.firstChild);
    btnCloseChat = btnHolder.firstChild;
    btnCloseChat.onclick = e => {
        // send key event ESC
        document.dispatchEvent(new KeyboardEvent("keydown", {key: "Escape"}));

        setTimeout(() => {
            checkOpenChat();
        }, 10);
    }

    // Open/Close chat event listener
    sideChatListener = e => {
        setTimeout(() => {
            checkOpenChat();
        }, 100);
    }
    side.onmousedown = sideChatListener;
    window.onkeydown = sideChatListener;

    // add search button
    btnHolder.insertBefore(stringToNode(btnSearch), btnHolder.lastChild);
    btnSearch = btnHolder.childNodes[ btnHolder.childNodes.length - 2 ];
    btnSearch.onclick = e => {
        // Deactivate unread filtering
        if (document.querySelector("button.tt8xd2xn > div.evq4wxsl"))
            document.querySelector("button.tt8xd2xn").click();
        
        // clear inputBox
        setTimeout(() => {
            chatSearchBox.dispatchEvent(new KeyboardEvent("keydown", {keyCode: 27}));
        }, 20);

        // hides bar
        document.querySelector("#side").classList.toggle('search');
        // btn higlighting
        btnSearch.classList.toggle('_2Qn52');
    }

    checkUpdates();
}

function checkOpenChat() {
    if (document.getElementById('main') == null) {
        // without open chat
        side.classList.remove('chat');
        btnCloseChat.classList.add('hidden');
        chatListHeader.classList.remove('filled');
    }
    else {
        // with open chat:
        side.classList.add('chat');
        btnCloseChat.classList.remove('hidden');
        chatListHeader.classList.add('filled');
    }
}

function stringToNode(string) {
    let tempNode = document.createElement('div');
    tempNode.innerHTML = string.trim();
    return tempNode.firstChild;
}

async function checkUpdates() {
    let updateURL = "https://raw.githubusercontent.com/Zanzigu/Theme-for-WhatsApp/main/latestStable.json";
    let response = await fetch(updateURL);
    let data = await response.json();

    var manifestData = chrome.runtime.getManifest();
    if (manifestData.version < data.version) {
        // suggest update
        let popup = new Popup("Update found!", "Would you like to update?", [
            {
                "text": "Ok",
                "type": "filled",
                "event": e => {
                    window.open(data.link, "_blank");
                }
            },
            {
                "text": "Ignore",
                "type": "outlined",
                "event": e => {
                    popup.dismiss();
                }
            }
        ]);
    }
}

// popup management
const _popup = `<div class="popup hidden"><div wrapper></div><div></div></div>`;
const _popupBtnContainer = `<div class="btnContainer"></div>`;
const _popupBtn = `<div class="button"></div>`;
// buttons: [{"text": "", "type": "", "event": e}, ...]
// button types: filled, outlined, text
class Popup {
    #popup = null;

    constructor(text, descriprtion, buttons) {
        app.appendChild(stringToNode(_popup));
        this.#popup = app.lastChild;
        let popup = this.#popup.lastChild;

        this.#popup.firstChild.onclick = _ => this.dismiss();

        popup.appendChild(stringToNode(`<h1>${text}</h1>`));
        popup.appendChild(stringToNode(`<p>${descriprtion}</p>`));

        popup.appendChild(stringToNode(_popupBtnContainer));
        let btnContainer = popup.lastChild;
        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            btnContainer.appendChild(stringToNode(_popupBtn));
            btnContainer.lastChild.classList.add(button.type);
            btnContainer.lastChild.innerHTML = button.text;
            btnContainer.lastChild.onclick = button.event;
        }

        setTimeout(() => {
            this.#popup.classList.remove('hidden');
        }, 500);
    }

    dismiss = () => {
        this.#popup.classList.add('hidden');
        setTimeout(() => {
            this.#popup.remove();
        }, 500);
    };
}