users()

userList = [ "Solin", "Timzzz1" ]

async function users() {
    const userName = await eel.get_username()()

    const userPic = '/users/' + userName + '/.userpic'

    let menu = ''

    userList.forEach(element => {
        if (element != userName) {
            menu += `
            <li class="menu__item">
                <button class="menu__item--user" onclick="gotoUser(${element})">
                    <p class="menu__item--user-name">${element}</p>
                    <img class="menu__item--user-pic" src="${'/users/' + element + '/.userpic'}" alt="${element}">
                </button>
            </li>
        `
        }
    })

    userChange.innerHTML = `
        <button class="user__pic" onclick="userMenuToggle()">
            <p class="user__pic-name">${userName}</p>
            <img class="user__pic-img" src="${userPic}" alt="${userName}">
        </button>
        <ul class="menu menu--hidden" id="userMenu">${menu}</ul>
    `
}


function userMenuToggle() {
    userMenu.classList.toggle('menu--hidden')
}

async function gotoUser(user) {

    const list = [
        '',
        '',
        '',
        user
    ]

    res = await eel.get_input(list)()
}