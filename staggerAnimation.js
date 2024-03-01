document.addEventListener('DOMContentLoaded', function() {
    const cmsItems = document.querySelectorAll('.cms_list .cms_item');

    cmsItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 100}ms`;
    });
});
