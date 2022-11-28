async function renderWorkspaces() {
    let res = await eel.get_curworkspace()()

    workspaces.innerHTML = `
    <li class="workspaces__item${res[0].currentWorkspace == 'disk' ? ' workspaces__item-active' : ''}">
        <img class="workspaces__item--icon${res[0].currentWorkspace != 'disk' ? ' workspaces__item--icon-active' : ''}" src="${res[0].currentWorkspace != 'disk' ? '/icons/sidebar/home.svg' : '/icons/sidebar/homeFill.svg'}" alt="Мой диск">
        <p class="workspaces__item--title${res[0].currentWorkspace == 'disk' ? ' workspaces__item--title-active' : ''}">Мой диск</p>
        <button class="workspaces__item--btn${res[0].currentWorkspace != 'disk' ? ' workspaces__item--btn-active' : ''}" onclick="workspaceChange('disk')"></button>
    </li>
    <li class="workspaces__item${res[0].currentWorkspace == 'recent' ? ' workspaces__item-active' : ''}">
        <img class="workspaces__item--icon${res[0].currentWorkspace != 'recent' ? ' workspaces__item--icon-active' : ''}" src="${res[0].currentWorkspace != 'recent' ? '/icons/sidebar/recent.svg' : '/icons/sidebar/recentFill.svg'}" alt="Недавние">
        <p class="workspaces__item--title${res[0].currentWorkspace == 'recent' ? ' workspaces__item--title-active' : ''}">Недавние</p>
        <button class="workspaces__item--btn${res[0].currentWorkspace != 'recent' ? ' workspaces__item--btn-active' : ''}" onclick="workspaceChange('recent')"></button>
    </li>
    <li class="workspaces__item${res[0].currentWorkspace == 'fav' ? ' workspaces__item-active' : ''}">
        <img class="workspaces__item--icon${res[0].currentWorkspace != 'fav' ? ' workspaces__item--icon-active' : ''}" src="${res[0].currentWorkspace != 'fav' ? '/icons/sidebar/star.svg' : '/icons/sidebar/starFill.svg'}" alt="Избранное">
        <p class="workspaces__item--title${res[0].currentWorkspace == 'fav' ? ' workspaces__item--title-active' : ''}">Избранное</p>
        <button class="workspaces__item--btn${res[0].currentWorkspace != 'fav' ? ' workspaces__item--btn-active' : ''}" onclick="workspaceChange('fav')"></button>
    </li>
`
}

async function workspaceChange(workspace) {
    res = eel.changeworkspace(workspace)()
}