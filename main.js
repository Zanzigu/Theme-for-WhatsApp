var btnCloseChat = `<div class="_3OtEr hidden" data-testid="menu-bar-close-chat">
    <div aria-disabled="false" role="button" tabindex="0" class="_3ndVb" data-tab="2" title="Chiudi chat" aria-label="Chiudi chat">
        <span class="material-symbols-rounded icon">
            comments_disabled
        </span>
    </div>
</div>`;
var btnSearch = `<div class="_3OtEr" data-testid="menu-bar-search">
    <div aria-disabled="false" role="button" tabindex="0" class="_3ndVb" data-tab="2" title="Cerca" aria-label="Cerca">
        <span class="material-symbols-rounded icon">
            search
        </span>
    </div>
</div>`;
var btnHolder, divSide, chatListHeader;


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

            side = document.getElementById('side');
            chatListHeader = document.querySelector("#app > div > div > div._2Ts6i._3RGKj > header");
            btnHolder = document.querySelector("#app > div > div > div._2Ts6i._3RGKj > header > div._604FD > div > span");
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
        document.dispatchEvent(new KeyboardEvent(
            "keydown",
            {
                altKey: false,
                code: "Escape",
                ctrlKey: false,
                isComposing: false,
                key: "Escape",
                location: 0,
                metaKey: false,
                repeat: false,
                shiftKey: false,
                which: 27,
                charCode: 0,
                keyCode: 27,
            })
        );

        setTimeout(() => {
            checkOpenChat();
        }, 10);
    }

    // Open/Close chat event listener
    side.onmousedown = e => {
        setTimeout(() => {
            checkOpenChat();
        }, 10);
    }

    window.onkeydown = e => {
        setTimeout(() => {
            checkOpenChat();
        }, 10);
    }

    // add search button
    btnHolder.insertBefore(stringToNode(btnSearch), btnHolder.lastChild);
    btnSearch = btnHolder.childNodes[ btnHolder.childNodes.length - 2 ];
    btnSearch.onclick = e => {
        document.querySelector("#side").classList.toggle('search');
        btnSearch.classList.toggle('_2Qn52');
    }

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