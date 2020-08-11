import $ from '@core/DOM';

export default function resizeHandler($root, e) {
    const $resizer = $(e.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    let value;

    $resizer.css({
        opacity: '1'
    });

    document.onmousemove = event => {
        if(type === 'col') {
            const delta = event.pageX - coords.right;
            value = coords.width + delta;

            $resizer.css({
                right: -delta + 'px',
                bottom: '-5000px'
            });
        } else {
            const delta = event.pageY - coords.bottom;
            value = coords.height + delta;
            const rowWidth = $resizer.closest('.row').width;

            $resizer.css({
                bottom: -delta + 'px',
                width: rowWidth + 'px'
            });
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;

        if(type === 'col') {
            const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
            $parent.css({width: value + 'px'});

            cells.forEach(el => {
                el.style.width = value + 'px';
           });
        } else {
            $parent.css({height: value + 'px'});
        }

        $resizer.css({
            opacity: '0',
            bottom: '0',
            right: '0',
            width: 'initial'
        });
    }
}