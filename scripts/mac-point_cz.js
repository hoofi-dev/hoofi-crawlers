
await page.onLoad();


const stats = {
    allLinks: 0,
    filteredLinks: 0,
    paginationPages: 0,
}


const currentPage = await page.getCurrentPage();

if(currentPage.rawLink.ctx === 'product-page') {
    let desc = document.querySelectorAll('[data-testid="productCardShortDescr"]');
    let params = document.querySelectorAll('.detail-parameters');

    if (desc.length !== 1) {
        throw new Error(`desc.length === ${desc.length}`);
    }
    if (params.length !== 2) {
        throw new Error(`params.length === ${params.length}`);
    }

    const id = window.location.href;

    await page.publishItems([{id, data: {id, desc: desc[0].innerHTML, params: params[0].innerHTML + params[1].innerHTML, links: [{href: id}]}}]);

} else {

    async function getLinks() {

        let hrefs = Array.from(document.querySelectorAll('[data-testid="productCards"] [data-micro="url"]')).map(a => a.href);
        console.log(hrefs);
        stats.allLinks += hrefs.length;

        hrefs = hrefs.filter(href => /-m(\d+)-/.test(href));
        hrefs = hrefs.filter(href => !/-8gb-/.test(href));
        stats.filteredLinks += hrefs.length;

        await page.followLinks(hrefs.map(href => ({href, ctx: 'product-page'})));
        console.log('Got links', stats);
    }


    async function loadNext() {
        const buttons = document.querySelectorAll('button');
        for(let button of buttons) {
            if(/Načíst (\d+) další/.test(button.innerText)) {
                button.click();
                return true;
            }
        }
        return false;
    }

    let hasNext = true;

    do {
        await page.sleep(5000);
        console.log(`Loading page`, stats);
        hasNext = await loadNext();
        stats.paginationPages ++;
    } while(hasNext);

    await page.sleep(5000);

    await getLinks();

    console.log('pagination finished', stats);
}
