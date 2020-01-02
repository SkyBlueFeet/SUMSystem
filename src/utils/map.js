export default function(obj, map) {
    let rMap = {};
    if (Array.isArray(obj)) {
        for (let index = 0; index < obj.length; index++) {
            let item = obj[index];
            if (!map(item, index, obj)) {
                delete obj[index];
            } else {
                rMap[item] = map(item, index, obj);
            }
        }
    } else {
        for (let key of Object.keys(obj)) {
            if (!map(key, obj[key], obj)) {
                delete obj[key];
            } else {
                obj[key] = map(obj[key], key, obj);
            }
        }
        rMap = obj;
    }
    return rMap;
}