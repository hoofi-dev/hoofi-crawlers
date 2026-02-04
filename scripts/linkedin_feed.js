await (async () => {

    await onLoad();
    await sleep(3000, 6000);

    const mainContainer = document.querySelector('main');
    for (let ix = 0; ix < 4; ix++) {
        log(`scroll ix=${ix}, mainContainer.scrollHeight=${mainContainer.scrollHeight}`);
        mainContainer.scrollTo({
            top: mainContainer.scrollHeight,
            behavior: 'smooth'
        });
        await sleep(3000, 6000);
    }

    const maybePosts = Array.from(document.querySelectorAll('[data-testId="mainFeed"]>div'));
    log(`got ${maybePosts.length} posts`);

    const items = maybePosts
        //skip the non post cards at the top
        .filter((post, ix) => !!post.querySelector('[data-testid="expandable-text-box"]'))
        .map(post => {
            const images = Array.from(post.querySelectorAll('img'))
                .filter(img => img.naturalWidth > 100)
                .map(img => ({src: img.src}))

            let links = Array.from(post.querySelectorAll('a'))
                .map(a => ({href: a.href}))

            links = links.filter(link => !link.href.includes('/search/'))
            links = links.filter(link => !link.href.includes('/redir/'))

            //deduplicate
            links = [...new Map(links.map(link => [link.href, link])).values()];

            const text = post.querySelector('[data-testid="expandable-text-box"]').innerText;

            return {
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