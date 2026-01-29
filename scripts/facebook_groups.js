

const groupsUrl = 'https://www.facebook.com/?filter=groups&sk=h_chr'

if (location.href === groupsUrl) {

    // const sleep = ((timeout) => {
    //     return new Promise(resolve => setTimeout(resolve, timeout));
    // })

    await sleep(5000, 10000);

    let postIx = 0;

    for(let iterationIx = 0; iterationIx < 5; iterationIx++) {
        const posts = Array.from(document.querySelectorAll('[aria-posinset]'))

        for (; postIx < posts.length; postIx++) {
            //console.log(post);
            const post = posts[postIx];

            post.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            });

            const buttonText = 'Zobrazit víc';
            for (const button of post.querySelectorAll('[role="button"]')) {
                if (button.innerText === buttonText) {
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

            let primaryHref = null;
            for (let lc of links) {
                if (lc.href.includes('/posts/')) {
                    primaryHref = lc.href;
                }
            }

            const images = Array.from(post.querySelectorAll('img'))
                .filter(img => img.width > 20 && img.src)
                .map(img => ({src: img.src}))

            const match = primaryHref?.match(/posts\/(\d+)/);
            const id = match?.[0];
            const result = {id, text, links: [{href: primaryHref}], images};
            console.log(result);

            await publishItems([{id: id ?? '', data: result}]);
        }
    }

} else {
    throw new Error(`Unexpected URL ${location.href}`)
}

