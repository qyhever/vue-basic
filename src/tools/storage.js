/**
 * 封装操作localStorage的方法
 *
 * H5内置API
 * 1、获取数据：var str = localStorage.getItem(key);
 * 2、添加数据：localStorage.setItem(key, value)  // value是字符串
 * 3、移除数据：localStorage.removeItem(key);
 */

// 1.0 定义常量KEY，将来操作localStorage中的数据都可以使用KEY做为标识
const KEY = 'goodsdata';

let valueObj = { goodsId: 0, count: 0 };

// 2.0 获取数据
let getItem = () => {
    let jsonString = localStorage.getItem(KEY) || '[]';
    return JSON.parse(jsonString);
};

// 3.0 添加数据
let setItem = (value) => {
    // 获取数据
    let data = getItem();
    // 将要添加的value追加到data
    data.push(value);
    // 保存
    localStorage.setItem(KEY, JSON.stringify(data));
};

// 4.0 移除数据
let removeItem = (goodsId) => {
    let data = getItem();
    // 循环遍历，找到传入的这条数据
    for (let i = 0; i < data.length; i++) {
        if (goodsId == data[i].goodsId) {
            // 从i开始，从data中截取出去一条数据
            data.splice(i, 1);
        }
    }

    // 保存
    localStorage.setItem(KEY, JSON.stringify(data));
};

// 5.0 将localStorage中的数据整合成对象的形式
/**
 * 初始数据格式(json): [{goodsId:87,count:1},{goodsId:87,count:3},{goodsId:88,count:1}]
 * -->
 * 需要的对象形式：{ 商品id: 购买数量, 商品id: 购买数量 }
 * 				   { 87: 4,88: 1 }
 */
let getGoodsObject = () => {
    let data = getItem();
    let result = {};
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        if (!result[item.goodsId]) {
            // 如果没有当前商品的数据，则添加一条数据
            result[item.goodsId] = item.count;
        } else {
            // 如果已经有当前商品，则将count追加
            result[item.goodsId] += item.count;
        }
    }
    return result;
};

// 6.0 操作保存在localStorage中的数据
let updateData = (obj) => {
    let data = getItem();
    let count = 1;
    if (obj.type == 'add') {
        // 加
        data.push({ goodsId: obj.goodsId, count: count });
    } else {
        // 减
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            // 如果这个对象中的count值等于1，则删除这个对象，否则将这个对象的count减1以后保存回去
            if (obj.goodsId == item.goodsId) {
                if (item.count > 1) {
                    item.count--;
                    break;
                } else {
                    data.splice(i, 1);
                    break;
                }
            }
        }
    }
    localStorage.setItem(KEY, JSON.stringify(data));
};

export { KEY, valueObj, getItem, setItem, removeItem, getGoodsObject, updateData };