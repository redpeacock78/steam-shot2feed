import scrape from '../libs/scrape.js';

export default (fastify, opts, done) => {
  fastify.get('/feed/:username', async (request, reply) => {
    await scrape(request.params.username)
      .then((i) =>
        reply
          .header('Content-Type', 'application/xml; charset=UTF-8')
          .header('Cache-Control', 'maxage=600, public')
          .view('./views/feed.liquid', {
            items: i,
            username: request.params.username,
            date: new Date().toUTCString(),
          })
      )
      .catch((e) => {
        const err = new Error();
        if (e.status) err.statusCode = e.status;
        if (e.statusText) err.message = e.statusText;
        throw err;
      });
  });
  done();
};
