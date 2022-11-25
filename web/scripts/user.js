users()

async function users() {
    const userName = await eel.get_username()()

    const userPic = '/users/' + userName[0] + '/.userpic'

    let menu = ''

    userName[1].forEach(element => {
        if (element != userName[0]) {
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
            <p class="user__pic-name">${userName[0]}</p>
            <img class="user__pic-img" src="${userPic != undefined ? userPic : '/icons/users/default-user.svg'}" alt="${userName[0]}">
        </button>
        <ul class="menu menu--hidden" id="userMenu">${menu}</ul>
    `
}


function userMenuToggle() {
    userMenu.classList.toggle('menu--hidden')
}

async function gotoUser(user) {

    const list = [
        user
    ]

    res = await eel.get_username(list)()
}