let out = ''

function preview(path, title, type) {

    type == 'file' ? out = '<p class="preview__modal--content-file"></p>' : ''
    type == 'image' ? out = '<img class="preview__modal--content-img" src="' + path + '" alt="' + title + '">' : ''
    type == 'video' ? out = '<video class="preview__modal--content-video" controls src="' + path + '"></video>' : ''
    type == 'audio' ? out = '<audio class="preview__modal--content-audio" src="' + path + '"></audio>' : ''

    body.insertAdjacentHTML('afterbegin', `
        <div class="preview" id="previewModal">
            <div class="preview__modal">
                <div class="preview__modal--header">
                    <h2 class="preview__modal--header-title">${title}</h2>
                    <button class="preview__modal--header-close" type="button" onclick="previewDestroy()">X</button>
                </div>
                <div class="preview__modal--content">
                    ${out}
                </div>
                <div class="preview__modal--footer">
                    <a class="preview__modal--footer-link" download="${title}" href="${path}">Скачать файл</a>
                </div>
            </div>
        </div>
    `)
}

function previewDestroy() {
    previewModal.remove()
}