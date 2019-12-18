import navData from '@/copywriting/nav.jsonc';

/**
 *
 * @param { String } thisPath
 */
export default function(thisPath) {
    let pathArr = thisPath.split('/');
    pathArr.shift();
    let reArr = [];
    for (let item of navData.menu) {
        if (item.index === pathArr[0]) {
            reArr.push({
                title: item.title,
                path: `/${pathArr[0]}`
            });
            if (pathArr.length > 1) {
                for (let subItem of item.subMenu) {
                    if (subItem.index === pathArr[1]) {
                        reArr.push({
                            title: subItem.title,
                            path: `/${pathArr[0]}/${pathArr[1]}`
                        });
                    }
                }
            }
        }
    }
    return reArr;
}