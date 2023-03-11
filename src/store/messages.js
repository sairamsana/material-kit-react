import { makeAutoObservable, runInAction } from 'mobx';

class Message {
    messages = []

    constructor() {
        makeAutoObservable(this);
    }

    pushMessage = async (message) => {
        message.status = 1;
        message.time = new Date().getTime();
        if (
            message.closeAfter !== 0 ||
            message.closeAfter === null ||
            message.closeAfter === undefined
        ) {
            message.closeAfter = 10 * 1000;
        } else if (message.closeAfter > 0) {
            message.closeAfter *= 1000;
        }

        message.severity = message.severity || "success";
        message.title = message.title || "Message";
        this.messages.push(message);
        if (message.closeAfter) {
            setTimeout(() => {
                this.autoCleanMessages()
            }, message.closeAfter);
        }

    }

    autoCleanMessages() {
        for (let i = 0; i < this.messages.length; i += 1) {
            if (
                this.messages[i].closeAfter > 0 &&
                new Date().getTime() - this.messages[i].time >=
                this.messages[i].closeAfter
            ) {
                this.messages.splice(i, 1);
                i -= 1;
            }
        }
    }

    popMessage(i) {
        this.messages.splice(i, 1);
    }
}

const myMessage = new Message();

export default myMessage;
