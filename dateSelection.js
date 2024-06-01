document.addEventListener('DOMContentLoaded', () => {
    const picker = new easepick.create({
        element: document.getElementById('easepick-calendar'),
        css: [
            'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css'
        ],
        format: 'YYYY-MM-DD',
        inline: true,
        calendars: 1,
        lang: 'en-US',
        plugins: ['RangePlugin'],
        RangePlugin: {
            tooltip: true
        },
        setup(picker) {
            picker.on('select', (event) => {
                const { start, end } = event.detail;
                console.log(start, end);
            });
        }
    });
});
