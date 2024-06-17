import NodeCache from 'node-cache';
const cacheHandler = new NodeCache({ stdTTL: 600, checkperiod: 120 });

export default cacheHandler;