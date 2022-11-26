users()

async function users() {
    const userName = await eel.get_username()()

    const userPic = '/users/' + userName[0] + '/.userpic'

    let list = ''

    headerUser.innerHTML = `
        <img class="header__userpic--img" src="${userPic}" alt="Userpic">
        <button class="header__userpic--btn" onclick="userListToggle()"></button>
    `

    userName[1].forEach(element => {
        if (element != userName[0]) {
            list += `
            <li class="users-list__item">
                <img class="users-list__item--img" src="${'/users/' + element + '/.userpic'}" alt="${element}" alt="${element}">
                <p class="users-list__item--title">${element}</p>
                <button class="users-list__item--btn" onclick="gotoUser(${element})"></button>
            </li>
        `
        }
    })

    userList.innerHTML = `
        <div class="users__current">
            <img class="users__users__current--img" src="${userPic}" alt="${userName[0]}">
            <p class="users__users__current--title">Solin</p>
        </div>
        <ul class="users-list" id="userList">${list}</ul>
    `
}


function userListToggle() {
    userList.classList.toggle('hidden')
}

async function gotoUser(user) {

    const list = [
        user
    ]

    res = await eel.get_username(list)()
}