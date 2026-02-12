(async () => {
    const mainContainer = document.querySelector('main');
    for (let ix = 0; ix < 3; ix++) {
        mainContainer.scrollTo({
            top: mainContainer.scrollHeight,
            behavior: 'smooth'
        });
        await new Promise(res => setTimeout(res, 3000));

    }

    const posts = Array.from(document.querySelectorAll('[data-testId="mainFeed"]>div'));

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
                elmOuterHtml: elm.outerHTML,
                text,
                images,
                links
            }
        });

    // await publishItems(items.map(item => ({
    //     id: '', // id required for deduplication
    //     data: item, // custom data
    //     dedupe: 'NEVER'
    // })));
    //
    console.log(items);
})()


(async () => {
    const mainContainer = document.querySelector('main');


    let posts = Array.from(document.querySelectorAll('[data-testId="mainFeed"]>div'));

    posts = posts
        //skip the non post cards at the top
        .filter((post, ix) => ix > 2);

    const items = [];

    for(let post of posts) {
        mainContainer.scrollTo({
            top: mainContainer.scrollHeight,
            //behavior: 'smooth'
        });
        await sleep(100);
        const images = Array.from(post.querySelectorAll('img'))
            .filter(img => img.naturalWidth > 100)
            .map(img => ({src: img.src}))

        const links = Array.from(post.querySelectorAll('a'))
            .map(a => ({href: a.href}))

        let text = post.innerText;
        text = text.replace(/\n+/g, '\n');
        text = text.replace(/Feed post\n/g, '');

        items.push({
            post,
            //elmOuterHtml: elm.outerHTML,
            text,
            images,
            links
        })

    }


    // await publishItems(items.map(item => ({
    //     id: '', // id required for deduplication
    //     data: item, // custom data
    //     dedupe: 'NEVER'
    // })));
    //
    function sleep(ms) {
        return new Promise(res => setTimeout(res, ms))
    }

    console.log(items);
})()


(async () => {
    const mainContainer = document.querySelector('main');


    let posts = Array.from(document.querySelectorAll('[data-testId="mainFeed"]>div'));

    posts = posts
        //skip the non post cards at the top
        .filter((post, ix) => ix > 2);

    const items = [];

    let ix = 0;
    for(let post of posts) {

        //     post.scrollIntoView({
        //         block: 'end',
        //  				behavior: 'smooth',
        //   })
        //    await sleep(1000);

        const moreButton = Array.from(document.querySelectorAll('span'))
            .find(el => el.innerText.trim() === '…')

        if(moreButton) {
//           moreButton.click();
            //  sleep(100);
        }

        const images = Array.from(post.querySelectorAll('img'))
            .filter(img => img.naturalWidth > 100)
            .map(img => ({src: img.src}))

        const links = Array.from(post.querySelectorAll('a'))
            .map(a => ({href: a.href}))

        let text = post.innerText;
        text = text.replace(/\n+/g, '\n');
        text = text.replace(/Feed post\n/g, '');

        items.push({
            moreButton,
            //elmOuterHtml: elm.outerHTML,
            text,
            images,
            links
        })

    }


    // await publishItems(items.map(item => ({
    //     id: '', // id required for deduplication
    //     data: item, // custom data
    //     dedupe: 'NEVER'
    // })));
    //
    function sleep(ms) {
        return new Promise(res => setTimeout(res, ms))
    }

    console.log(items);
})()