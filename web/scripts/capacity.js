renderCapacityBar()

async function renderCapacityBar() {
    res = await eel.get_capacity()()

    renderCapacity(res[0].diskCapacity, res[0].diskSystem, res[0].diskUser)
}

function renderCapacity(diskCapacity, diskSystem, diskUser) {

    let a = (diskSystem - diskCapacity) * 100 / diskSystem
    let b = ((diskSystem - diskCapacity) + diskUser) * 100 / diskSystem

    console.log(diskUser);

    capacity.innerHTML = `
        <div class="sidebar__capacity--bar">
            <div class="sidebar__capacity--bar-system" style="width:${a}%"></div>
            <div class="sidebar__capacity--bar-user" style="width:${b}%"></div>
        </div>
        <p class="sidebar__capacity--space">${formatSizeUnits(diskSystem - diskCapacity)} / ${formatSizeUnits(diskSystem)}</p>
    `
}