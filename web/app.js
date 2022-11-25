render()

searchBar = document.getElementById('searchBar')

let time

searchBar.oninput = function() {
    clearTimeout(time)

    time = setTimeout(function() {
        render()
    }, 400)
}

async function render() {
    output.innerHTML = ''
    const searchInput = searchBar.value

    const list = [
        '',
        searchInput,
        ''
    ]

    const res = await eel.get_input(list)()

    res.forEach(element => {
        let title, size, fileType, button, action = ''

        element[3] == 'b_folder' ? fileType = '/icons/b_folder.svg' : ''
        element[3] == "folder" ? fileType = '/icons/folder.svg' : ''
        element[3] == "file" ? fileType = '/icons/file.svg' : ''

        element[3] == "image" ? fileType = element[0] : ''
        element[3] == "video" ? fileType = '/icons/video.svg' : ''
        element[3] == "audio" ? fileType = '/icons/music.svg' : ''

        element[3] == 'b_folder' ? title = element[4] : title = element[1]
        size = element[3] == "folder" ? element[2] + " элемент-а(ов)" : formatSizeUnits(element[2])
        element[3] == "b_folder" ? size = "Вернутся" : size

        if (element[3] == 'b_folder' || element[3] == 'folder') {
            button = `
                <button class="bar__file--btn" type="button" onclick="go('${element[1]}', '${element[2]}' ,'${element[3]}')">
                    <img class="bar__file--btn-pic" src="${element[3] == "folder" ? "/icons/folder.svg" : fileType}"/>
                </button>
            `

            action = `
            <div class="bar__file--action">
                <p class="bar__file--action-size">${size}</p>
            </div>
            `
        }
        else {
            button = `
            <a href="${element[0]}" target="_blank">
                <button class="bar__file--btn">
                    <img class="bar__file--btn-pic" src="${element[3] == "folder" ? "/icons/folder.svg" : fileType}"/>
                </button>
            </a>
            `
            action = `
            <div class="bar__file--action">
                <p class="bar__file--action-size">${size}</p>
                <a class="bar__file--action-download" href="${element[0]}" download="${element[1]}"><svg height="30" width="30" viewBox="0 0 20 20"><path d="M5.5 16q-.625 0-1.062-.438Q4 15.125 4 14.5V13h1.5v1.5h9V13H16v1.5q0 .625-.438 1.062Q15.125 16 14.5 16Zm4.5-3L6 9l1.062-1.062 2.188 2.187V3h1.5v7.125l2.188-2.187L14 9Z"/></svg></a>
            </div>
            `
        }

        if (element[1] != "" && element[4] != '~') {
            output.innerHTML += `
            <li class="bar">
                ${button}
                <p class="bar__file--title">${title}</p>
                ${action}
            </li>
            `
        }
    })
}

function go(name, folder, type) {
    let nameBack = folder.split('/').slice(-1)
    let nameCur = name

    type == 'b_folder' ? push(nameBack, type) : push(nameCur, type)
}

async function push(name, type, tool) {
    name == '' ? name = '\\' : name
    const out = searchBar.value
    let outName = ''

    type == 'b_folder' ? outName = '-' + name : outName = '+' + name

    const list = [
        outName,
        out,
        tool
    ]

    const res = await eel.get_input(list)()

    render()
}

async function toolChange(tool) {
    push('', '', tool)
}

function formatSizeUnits(bytes){
    if      (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
    else if (bytes >= 1048576)    { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
    else if (bytes >= 1024)       { bytes = (bytes / 1024).toFixed(2) + " KB"; }
    else if (bytes > 1)           { bytes = bytes + " bytes"; }
    else if (bytes == 1)          { bytes = bytes + " byte"; }
    else                          { bytes = "0 bytes"; }
    return bytes;
}
