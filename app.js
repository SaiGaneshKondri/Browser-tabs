$(document).ready(function() {
    let tabCount = 0; 

    function createTab() {
        tabCount++;

        const tab = $('<div>', {
            class: 'tab',
            'data-tab-id': tabCount,
            html: `<input class="url-input" type="text" placeholder="Enter URL"><button class="close-tab">x</button>`
        }).appendTo('.tabs');

        $('<iframe>', {
            id: 'iframe-' + tabCount,
            class: 'iframe',
            src: 'about:blank'
        }).appendTo('.content');

        $('.iframe').removeClass('active');
        $('.tab').removeClass('active');
        tab.addClass('active');
        $('#iframe-' + tabCount).addClass('active');
    }

    function closeTab(tabId) {
        $(`.tab[data-tab-id="${tabId}"]`).remove();
        $(`#iframe-${tabId}`).remove();
    }

    function switchTab(tabId) {
        $('.tab').removeClass('active');
        $(`.tab[data-tab-id="${tabId}"]`).addClass('active');

        $('.iframe').removeClass('active');
        $(`#iframe-${tabId}`).addClass('active');

        const url = $(`.tab[data-tab-id="${tabId}"] .url-input`).val();
        if (url) {
            $(`#iframe-${tabId}`).attr('src', url);
        } 
    }

    $('#new-tab-btn').click(function() {
        createTab();
    });

    $(document).on('click', '.close-tab', function(e) {
        e.stopPropagation();
        const tabId = $(this).parent().data('tab-id');
        closeTab(tabId);
    });

    $(document).on('click', '.tab', function() {
        const tabId = $(this).data('tab-id');
        switchTab(tabId);
    });

    $(document).on('keyup', '.url-input', function(e) {
        if (e.key === 'Enter') {
            const tabId = $(this).closest('.tab').data('tab-id');
            switchTab(tabId);
        }
    });
});
