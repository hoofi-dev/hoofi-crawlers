await (async () => {

    await onLoad();

    const mainContainer = document.querySelector('main');
    for (let ix = 0; ix < 3; ix++) {
        log(`scroll ${ix}`);
        mainContainer.scrollTo({
            top: mainContainer.scrollHeight,
            behavior: 'smooth'
        });
        await sleep(3000, 6000);

    }

    const posts = Array.from(document.querySelectorAll('[data-testId="mainFeed"]>div'));
    log(`got ${posts.length} posts`);

    const items = posts
        //skip the non post cards at the top
        .filter((post, ix) => ix > 2)
        .map(elm => {
            const images = Array.from(elm.querySelectorAll('img'))
                .filter(img => img.naturalWidth > 100)
                .map(img => ({src: img.src}))

            const links = Array.from(elm.querySelectorAll('a'))
                .map(a => ({href: a.href}))

            let text = elm.innerText;
            text = text.replace(/\n+/g, '\n');
            text = text.replace(/Feed post\n/g, '');

            return {
                // elm,
                text,
                images,
                links
            }
        });

    for(let ix = 0 ; ix < items.length ; ix ++) {
        log(`publishing item ${ix + 1}/${items.length}`);

        await publishItems([{
            id: '',
            data: items[ix],
            dedupe: 'NEVER'
        }]);
    }



    log(`publishing done`);

    console.log(items);
})()