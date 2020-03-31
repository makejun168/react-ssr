// 写一个方法 将下划线命名改成驼峰命名方法
function replaceStr(str) {
    if (!str.length) {
        return '';
    }
    let targetIndex = null;
    return str.split('').map((item, index) => {
        if (item === '_') {
            targetIndex = Number(index) + 1;
            return null;
        } else if (index === targetIndex) {
            return item.toUpperCase();
        } else {
            return item;
        }
    }).join('');
}

const target = 'kobe_gigi_AI';

replaceStr(target);
// console.log(replaceStr(target));