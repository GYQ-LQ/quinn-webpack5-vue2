/*
 * @Author: Quinn
 * @Date: 2021-03-26 15:47:18
 * @LastEditTime: 2021-03-26 16:06:09
 * @LastEditors: quinn
 * @Description:  
 */
console.log('aaaa');

let btn = document.createElement('button')
btn.innerHTML = '按钮1'

btn.addEventListener('click', () => {
    import('./test3').then(() => {
        console.log('加载完成')
    })
})

document.body.appendChild(btn)