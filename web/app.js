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

    if (res[0][2] > 0) {
        workspacePath.innerHTML = '~/*'
    }
    else {
        workspacePath.innerHTML = res[0][2].toString().replace('web/users/', '~/').replace('files/', '').replace('/files', '')
    }

    console.log(res[0][2]);
    res.forEach(element => {
        let title, size, fileType, content = ''

        element[3] == 'b_folder' ? fileType = '/icons/files/back.svg' : ''
        element[3] == "folder" ? fileType = '/icons/files/folder.svg' : ''
        element[3] == "file" ? fileType = '/icons/files/file.svg' : ''

        element[3] == "image" ? fileType = '/icons/files/image.svg' : ''
        element[3] == "video" ? fileType = '/icons/files/video.svg' : ''
        element[3] == "audio" ? fileType = '/icons/files/music.svg' : ''

        element[3] == 'b_folder' ? title = element[4] : title = element[1]
        size = element[3] == "folder" ? element[2] + " элемент-а(ов)" : formatSizeUnits(element[2])
        element[3] == "b_folder" ? size = "Вернутся" : size

        if (element[3] == 'b_folder' || element[3] == 'folder') {
            content = `
                <li class="file__item">
                    <img class="file__item--icon" src="${fileType}" alt="${element[1]}">
                    <p class="file__item--title">${title}</p>
                    <p class="file__item--size">${size}</p>
                    <button class="file__item--btn" onclick="go('${element[1]}', '${element[2]}' ,'${element[3]}')"></button>
                </li>
            `
        }
        else {
            content = `
                <li class="file__item">
                    <img class="file__item--icon" src="${fileType}" alt="${element[1]}">
                    <p class="file__item--title">${title}</p>
                    <p class="file__item--size">${size}</p>
                    <button class="file__item--btn"></button>
                </li>
            `
        }

        if (element[1] != "" && element[4] != '~') {
            output.innerHTML += `
                ${content}
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
