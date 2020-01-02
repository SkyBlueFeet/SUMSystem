import { member } from "@/apis/feild";

export default {
    item: Object.keys(new member()),
    save: function(user) {
        try {
            localStorage.setItem('status', user.id);
            localStorage.setItem(user.id, JSON.stringify(user));
        } catch (error) {
            console.error('无法使用本地存储,请升级您的浏览器!');
        }
    },
    get: function() {
        if (localStorage.getItem('status')) {
            let user = localStorage.getItem(localStorage.getItem('status'));
            return user;
        } else {
            return {};
        }
    },
    remove: function() {
        if (localStorage.getItem('status')) {
            localStorage.removeItem(localStorage.getItem('status'));
            localStorage.removeItem('status');
        }
    }
};