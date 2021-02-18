import Sitemap from 'react-router-sitemap';
import * as Path from 'path';
import routes from '../src/app/routes';

const buildPath = Path.resolve(__dirname, '../dist/sitemap.xml');
const host = 'http://fuku.tv';
new Sitemap(routes).build(host).save(buildPath);
