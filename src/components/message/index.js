/**
 * Created by Administrator on 2017/12/13.
 */
import Message from './message';

let messageInstance;

const getInstance = (content) => {
    if (!messageInstance) {
        messageInstance = Message.newInstance(content);
    }
    return messageInstance;
}

export default {
    info(content){
        let instance = getInstance(content);
        instance.show();
    }
};