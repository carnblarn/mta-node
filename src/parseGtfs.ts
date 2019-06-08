import { AxiosResponse } from 'axios';
import { load } from 'protobufjs';
import { resolve } from 'path';

export default (response: AxiosResponse) => {
    const protoFile = resolve(__dirname + '/proto/nyct-subway.proto');
    return load(protoFile).then(root => {
        const FeedMessage = root.lookupType('transit_realtime.FeedMessage');
        return FeedMessage.decode(response.data);
    });
};
