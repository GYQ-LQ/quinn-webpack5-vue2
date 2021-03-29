/*
 * @Author: Quinn
 * @Date: 2021-03-26 14:47:25
 * @LastEditTime: 2021-03-26 16:05:44
 * @LastEditors: quinn
 * @Description:  
 */
let a = 1,
    b = 2;
let c = a + b;
console.log(c);

let btn = document.createElement('button')
btn.innerHTML = '按钮1'

btn.addEventListener('click', () => {
    import('./utils/test').then(() => {
        console.log('加载完成')
    })
})

document.body.appendChild(btn)