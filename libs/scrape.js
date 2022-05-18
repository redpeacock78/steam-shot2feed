import ky from 'ky-universal';
import * as cheerio from 'cheerio';
import formatDate from './formatDate.js';

const scrape = async (param) => {
  const client = ky.create({
    headers: { 'Accept-Language': 'en,en-US;q=0.9,en;q=0.8' },
  });
  try {
    const detailUrls = [];
    const desc = [];
    const dates = [];
    const imageUrls = [];
    const url = `https://steamcommunity.com/id/${param}/screenshots/?appid=0&sort=newestfirst&browsefilter=myfiles&view=grid`;
    const resp = await client.get(url).text();
    const $ = cheerio.load(resp);
    $('div.imageWallRow > div > div.floatHelp').map((i, e) =>
      detailUrls.push($(e).find('a').attr('href'))
    );
    for (const url of detailUrls.slice(0, 19)) {
      try {
        const urlResp = await client.get(url).text();
        const url$ = cheerio.load(urlResp);
        url$('#caption_ctn > div.screenshotDescription').length !== 0
          ? url$('#caption_ctn > div.screenshotDescription').map((i, e) =>
              desc.push($(e).text())
            )
          : desc.push('');
        url$(
          '#rightContents > div > div:nth-child(1) > div:nth-child(3) > div.detailsStatsContainerRight > div:nth-child(2)'
        ).map((i, e) => dates.push($(e).text()));
        url$('#ig_bottom > div.mediaTop > div.actualmediactn').map((i, e) =>
          imageUrls.push($(e).find('a').attr('href'))
        );
      } catch (e) {
        throw e;
      }
    }
    return detailUrls.slice(0, 19).map((i, n) => {
      return {
        url: i,
        desc: desc[n].replace(/^[\"]/, '').replace(/[\"]$/, ''),
        date: dates[n],
        img: imageUrls[n],
      };
    });
  } catch (e) {
    if (e.response.status)
      throw {
        status: e.response.status,
        statusText: e.response.statusText,
      };
    throw e;
  }
};

export default scrape;
