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

    const res = await eel.get_input(searchInput)()

    res.forEach(element => {
        let title, size, fileType = ''

        element[3] == "file" ? fileType = "/icons/file.svg" : ''
        element[3] == "image" ? fileType = element[0] : ''
        element[3] == "b_folder" ? fileType = "/icons/back.svg" : ''

        element[3] == 'b_folder' ? title = element[4] : title = element[1]

        size = element[3] == "folder" ? element[2] + " элемент-а(ов)" : formatSizeUnits(element[2])

        element[3] == "b_folder" ? size = "Вернутся" : size

        if (element[1] != "" && element[4] != '~') {
            output.innerHTML += `
            <li class="bar">
                <button class="bar__file--btn" type="button" onclick="goBack('${element[1]}', '${element[2]}' ,'${element[3]}')">
                    <img class="bar__file--btn-pic" src="${element[3] == "folder" ? "/icons/folder.svg" : fileType}"/>
                </button>
                <p class="bar__file--title">${title}</p>
                <p class="bar__file--size">${size}</p>
            </li>
            `
        }
    })
}

function goBack(name, folder, type) {
    let nameBack = folder.split('/').slice(-1)
    let nameCur = name

    type == 'b_folder' ? go(nameBack, type) : go(nameCur, type)
}

async function go(name, type, tool) {
    name == '' ? name = '\\' : name
    const out = searchBar.value
    let outName = ''

    if (type != 'file' && type != 'document' && type != 'image') {
        type == 'b_folder' ? outName = '-' + name : outName = '+' + name
    }

    const list = [
        outName,
        out,
        tool
    ]

    const res = await eel.get_input(list)()

    render()
}

async function toolChange(tool) {
    go('', '', tool)
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
