




const groupsUrl = 'https://www.facebook.com/?filter=groups&sk=h_chr'

if(location.href === 'about:blank') {

    await sleep(4 * 60_000, 8 * 60_000);
    await followLinks([{href: groupsUrl}]);

} else if (location.href === groupsUrl) {

// (async () => {

    // const sleep = ((timeout) => {
    //     return new Promise(resolve => setTimeout(resolve, timeout));
    // })

    for(let i = 0; i < 5; i++) {
        await sleep(5000, 10000);
        window.scrollTo({
            top: document.body.scrollHeight, // Go to the very bottom
            left: 0,
            behavior: 'smooth'               // This triggers the smooth animation
        });
    }

    await sleep(5000, 10000);


    const posts = Array.from(document.querySelectorAll('[aria-posinset]'))

    for(let post of posts) {
        //console.log(post);
        const buttonText = 'Zobrazit víc'
        for(const button of post.querySelectorAll('[role="button"]')) {
            if(button.innerText === buttonText) {
                button.click();
            }
            console.log('clicked')

        }

        await sleep(3000, 5000);

        const links = Array.from(post.querySelectorAll('a'))
            .map(a => ({href: a.href, title: a.innerText}));

        let text = post.innerText.replaceAll('Facebook', '');
        text = text.replace(/^.$/gm, '');
        text = text.replace(/\n+/g, '\n');

        let link = null;
        for(let lc of links) {
            if(lc.href.includes('/posts/')) {
                link = lc.href;
            }
        }

        const match = link?.match(/posts\/(\d+)/);
        const id = match?.[0];
        const result = {id, text, link};
        console.log(result);

        await publishItems([{id: id ?? '', data: result}]);
    }

// })()

} else {
    throw new Error(`Unexpected URL ${location.href}`)
}

