/*
 * @Author: Quinn
 * @Date: 2021-03-26 15:15:57
 * @LastEditTime: 2021-03-26 16:05:55
 * @LastEditors: quinn
 * @Description:  
 */
console.log('test aaa a');

let btn = document.createElement('button')
btn.innerHTML = '按钮1a'

btn.addEventListener('click', () => {
    import('./test2').then(() => {
        console.log('加载完成')
    })
})

document.body.appendChild(btn)