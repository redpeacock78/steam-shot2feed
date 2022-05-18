import Fastify from 'fastify';
import POV from 'point-of-view';
import { Liquid } from 'liquidjs';
import path from 'path';

const app = Fastify();
const dirname = path.resolve(path.dirname(''));

const engine = new Liquid({
  root: path.join(dirname, 'views'),
  extname: '.liquid',
});

app.register(POV, {
  engine: {
    liquid: engine,
  },
});

app.register(import('./router/feed.js'));

app.listen(process.env.PORT || 8080, "0.0.0.0", (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
