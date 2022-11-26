renderCapacityBar()

async function renderCapacityBar() {
    res = await eel.get_capacity()()

    renderCapacity(res[0].diskCapacity, res[0].diskUsed, res[0].diskPercent)
}

function renderCapacity(diskUsed, diskCapacity, diskPercent) {
    capacity.innerHTML = `
        <div class="sidebar__capacity--bar">
            <div class="sidebar__capacity--bar-loading" style="width:${diskPercent}%"></div>
        </div>
        <p class="sidebar__capacity--space">${formatSizeUnits(diskUsed)} / ${formatSizeUnits(diskCapacity)}</p>
    `
}
