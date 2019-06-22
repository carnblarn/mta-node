import MtaApi from '../src';
import { APIKey } from './apiKey';

const Mta = new MtaApi(APIKey);

(async () => {
    const arrivals = await Mta.getRealtimeArrivals(1);
})();
