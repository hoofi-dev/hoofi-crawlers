

await page.onLoad();

let it = 0;
async function getItems() {
    console.log('starting it=', it);

    const req = await page.waitFor(async() => {
        const reqs = await page.getRequests();
        const match = reqs.find(req => req.url.includes('/api/search/offers'));
        if(match?.status === 200) {
            return match;
        }
        return false;
    });

    await console.log(req);

    const body = await req.body()

    const {member} = JSON.parse(body);

    let ix = 1;
    for(let item of member) {
        const {id} = item;
        console.log(`publishing item ${ix}/${member.length}`);

        await page.publishItems([{
            id,
            data: {
                id,
                title: byLocale(item.title),
                html: byLocale(item.description),
                links: [{href: `https://www.startupjobs.cz/nabidka/${item.displayId}/a`}]
            }
        }])
    }

    it ++;

}


async function loadNext() {
    await page.clearRequests();
    const buttons = document.querySelectorAll('button');
    for(let button of buttons) {
        if(button.innerText.includes('Načíst další stránku')) {
            button.click();
            return true;
        }
    }
    return false;
}


let hasNext = true;

do {
    await getItems();
    hasNext = await loadNext();
} while(hasNext);


function byLocale(loc) {
    if(loc['cs']) {
        return loc['cs']
    }

    return loc['en'];
}

await console.log();