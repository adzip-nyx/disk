renderWorkspaces()


async function renderWorkspaces() {
    let res = await eel.get_curworkspace()()

    console.log(res);

    workspaces.innerHTML = `
    <li class="workspaces__item workspaces__item-active">
        <img class="workspaces__item--icon workspaces__item--icon-active" src="/icons/sidebar/homeFill.svg" alt="Мой диск">
        <p class="workspaces__item--title workspaces__item--title-active">Мой диск</p>
        <button class="workspaces__item--btn workspaces__item--btn-active" onclick="toolChange('disk')"></button>
    </li>
    <li class="workspaces__item">
        <img class="workspaces__item--icon" src="/icons/sidebar/recent.svg" alt="Недавние">
        <p class="workspaces__item--title">Недавние</p>
        <button class="workspaces__item--btn" onclick="toolChange('recent')"></button>
    </li>
    <li class="workspaces__item">
        <img class="workspaces__item--icon" src="/icons/sidebar/star.svg" alt="Избранное">
        <p class="workspaces__item--title">Избранное</p>
        <button class="workspaces__item--btn" onclick="toolChange('fav')"></button>
    </li>
`
}
