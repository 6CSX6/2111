/**
 * 获取分页菜单数据
 */
async function getCategories(count) {
    try {
        let data = await ajaxPromise({
            method: 'get',
            url: `http://www.xiongmaoyouxuan.com/api/tab/${count}?start=0`,
        })
        if (data.code == 200) {
            // makeCategories(data.data)
            localStorage.setItem(`${count}`, JSON.stringify(data.data))
        }
    } catch (err) {
        console.log(err)
    }
}


/**
 * 分类菜单显示
 */
//divNOne创建
function creatDiv(x, content, spanEle, ulEle) {
    let divNone = document.createElement('div')
    let liObj = document.querySelector(`[data-index="${x}"]`).parentElement.parentElement
    divNone.className = 'none'
    liObj.appendChild(divNone)

    spanEle.addEventListener('mouseover', function() {
        divNone.style.display = 'block'
        divNone.innerHTML = content
        if (divNone.children.length >= 2) {
            divNone.lastElementChild.style.top = parseInt(window.getComputedStyle(divNone.firstElementChild).height) + 'px'
        }
    })

    ulEle.addEventListener('mouseout', function() {
            divNone.style.display = 'none'
        })
        // divNone.addEventListener('mouseout', function () {
        //     divNone.style.display = 'none'
        // })
}

function ShowCategories() {
    let UlObj = document.querySelector('.Categories')
    UlObj.addEventListener('mouseover', function(e) {
        // alert(1)
        e = e || window.event
        let target = e.target || e.srcElement
        if (target.getAttribute('data-index') == '1') {
            getCategories(2)
            getCategories(13)
            let first = JSON.parse(localStorage.getItem(2))
            let second = JSON.parse(localStorage.getItem(13))
            let Categories = {
                first,
                second,
                isOk: true
            }
            let content = template('Category', Categories)
                // console.log(this);
            creatDiv(1, content, target, this)


        } else if (target.getAttribute('data-index') == '2') {
            getCategories(5)
            getCategories(19)
            let first = JSON.parse(localStorage.getItem(5))
            let second = JSON.parse(localStorage.getItem(19))
            let Categories = {
                first,
                second,
                isOk: true
            }
            let content = template('Category', Categories)

            creatDiv(2, content, target, this)
        } else if (target.getAttribute('data-index') == '3') {
            getCategories(3)
            getCategories(15)
            let first = JSON.parse(localStorage.getItem(3))
            let second = JSON.parse(localStorage.getItem(15))
            let Categories = {
                first,
                second,
                isOk: true
            }
            let content = template('Category', Categories)

            creatDiv(3, content, target, this)
        } else if (target.getAttribute('data-index') == '4') {
            getCategories(4)
            getCategories(14)
            let first = JSON.parse(localStorage.getItem(4))
            let second = JSON.parse(localStorage.getItem(14))
            let Categories = {
                first,
                second,
                isOk: true
            }
            let content = template('Category', Categories)
            creatDiv(4, content, target, this)
        } else if (target.getAttribute('data-index') == '5') {
            getCategories(10)
            let first = JSON.parse(localStorage.getItem(10))
            let second = {}
            let Categories = {
                first,
                second
            }
            let content = template('Category', Categories)

            creatDiv(5, content, target, this)
        } else if (target.getAttribute('data-index') == '6') {
            getCategories(24)
            let first = JSON.parse(localStorage.getItem(24))
            let second = {}
            let Categories = {
                first,
                second
            }
            let content = template('Category', Categories)

            creatDiv(6, content, target, this)
        } else if (target.getAttribute('data-index') == '7') {
            getCategories(6)
            getCategories(12)
            let first = JSON.parse(localStorage.getItem(6))
            let second = JSON.parse(localStorage.getItem(12))
            let Categories = {
                first,
                second,
                isOk: true
            }
            let content = template('Category', Categories)

            creatDiv(7, content, target, this)
        } else if (target.getAttribute('data-index') == '8') {
            getCategories(16)
            let first = JSON.parse(localStorage.getItem(16))
            let second = {}
            let Categories = {
                first,
                second,
            }
            let content = template('Category', Categories)

            creatDiv(8, content, target, this)
        } else if (target.getAttribute('data-index') == '9') {
            getCategories(11)
            getCategories(7)
            let first = JSON.parse(localStorage.getItem(11))
            let second = JSON.parse(localStorage.getItem(7))
            let Categories = {
                first,
                second,
                isOk: true
            }
            let content = template('Category', Categories)

            creatDiv(9, content, target, this)
        }
    })
}
ShowCategories()

/**
 * 轮播获取图片
 */
function SwiperS() {
    //调用接口获取要轮播的图片
    ajaxPromise({
        method: 'get',
        url: 'http://www.xiongmaoyouxuan.com/api/tab/1'
    }).then(data => {
        if (data.code == 200) {
            ShowSwiper(data)
        }
    }).catch(err => {
        alert(err)
    })
}
SwiperS()
    /**
     * 轮播渲染数据
     */
function ShowSwiper(data) {
    let swiperBox = document.querySelector('.swiper-wrapper')
    if (data.data.banners.length == 0) {
        let str = ` <div class="swiper-slide"><img src="../static/images/banner1.png" style="width: 100%; height: 100%;" alt=""></div>`
        swiperBox.innerHTML = str
    } else {
        let str = data.data.banners.map((item) => {
                return ` <div class="swiper-slide"><img src="${item.imageUrl}" style="width: 100%; height: 100%;" alt=""></div>`
            })
            // console.log(str.join(''));
        swiperBox.innerHTML = str.join('')
    }
    let swiper = new Swiper(".mySwiper", {
        loop: true,
        autoplay: {
            delay: 2000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",

        },
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            clickable: true,
        },
    });
}

let list = []
    /**
     * 商品数据列表
     */
async function ShowProducts(pages) {
    try {
        //调用接口获取商品数据
        let data = await ajaxPromise({
            method: 'get',
            url: 'http://www.xiongmaoyouxuan.com/api/tab/1/feeds',
            data: {
                start: pages * 20,
                sort: 0
            }
        })
        let products = document.querySelector('.commodityData>ul')
        let num = data.data.list.length % 4
        if (num > 0) {
            data.data.list.splice(data.data.list.length - num, num)
        }
        //如果取到数据就赋给页面
        if (data.code == 200) {
            list = [...list, ...data.data.list]
            data.data.list = list
                // console.log(data);
            let content = template('product-list', data.data.list)
            products.innerHTML = content
        }
        //解决价格和购买人数等细节问题
        document.querySelectorAll('.isFreePostage').forEach((item, index) => {
            item.innerHTML = data.data.list[index].isFreePostage ? '包邮' : '不包邮'
        })
        document.querySelectorAll('.platform').forEach((item, index) => {
            if (data.data.list[index].platform == 1) {
                item.innerHTML = '淘宝'
            } else {
                item.innerHTML = '天猫'
            }
        })
        document.querySelectorAll('.bigPrice').forEach((item, index) => {
            item.innerHTML = parseInt(data.data.list[index].price)
        })
        document.querySelectorAll('.smallPrice').forEach((item, index) => {
            if (Math.round(data.data.list[index].price) == data.data.list[index].price) {
                item.innerHTML = '.0'
            } else {
                item.innerHTML = '.' + String(data.data.list[index].price).split('.')[1]

            }
        })
        document.querySelectorAll('.saleNum').forEach((item, index) => {
            if (data.data.list[index].saleNum > 10000) {
                item.innerHTML = (data.data.list[index].saleNum / 10000).toFixed(2) + '万人已买'
            } else {
                item.innerHTML = data.data.list[index].saleNum + '人已买'
            }
        })

    } catch (err) {
        console.log(err)
    }
}
ShowProducts(0)

// 节流
const throttle = (fn, time) => {
    let flag = true
    return function() {
        if (flag == false) return
        flag = false
        setTimeout(() => {
            fn.apply(this)
            flag = true
        }, time)
    }
}


/**
 * 点击查看更多加载商品数据
 */
function ShowMoreProduct() {
    let moreBtn = document.querySelector('.load>.btn')
    let flag = 0;
    moreBtn.addEventListener('click', throttle(function() {
        // alert(1)
        ShowProducts(++flag)
        window.onscroll = function() {
            if (document.documentElement.scrollTop + document.documentElement.clientHeight >= ((document.documentElement.scrollHeight) - 320)) {
                setTimeout(ShowProducts(++flag), 300)
            }
        }

    }, 500))
}
ShowMoreProduct()

/**
 * 回到顶部
 */
function returnTop() {
    let returnBtn = document.querySelector('#return')
    window.onscroll = function() {
        //页面卷入高度，也就是滚动条距离顶部距离
        if (document.documentElement.scrollTop > parseInt(window.getComputedStyle(document.querySelector('#head')).height + 46)) {
            returnBtn.style.display = 'block'
        } else {
            returnBtn.style.display = 'none'
        }
    }
    returnBtn.addEventListener('click', function() {
        var obj = setInterval(function() {
            // 1. 获取当前滚动条位置(距离顶部距离)
            var scrollTop = getScrollTop()
            var dist = scrollTop - 100
            setScrollTop(dist)

            // 3.至到当前滚动条位置小于等于0为止     
            if (dist <= 0) {
                clearInterval(obj)
            }
        }, 10)
    })

    /*
      设置滚动条离顶部距离
    */
    function setScrollTop(dist) {
        if (document.body.scrollTop) {
            document.body.scrollTop = dist
        } else {
            document.documentElement.scrollTop = dist
        }
    }
    /*
      获取滚动条离顶部距离
    */
    function getScrollTop() {
        return document.body.scrollTop || document.documentElement.scrollTop
    }
}
returnTop()

/**
 * 跳转详情页面
 */
function turnToDetail(order) {
    //新窗口跳转详情页面并将id放在url地址中传参
    window.open(`details.html?id=${order}`)
}
/**
 * 跳转包邮
 */
function turnToBaoYou() {
    document.querySelector('.baoyou').addEventListener('click', function() {
        location.href = 'baoyou.html'
    })
}
turnToBaoYou()
    /**
     * 跳转超值
     */
function turnToChaoZhi() {
    document.querySelector('.chaozhi').addEventListener('click', function() {
        location.href = 'chaozhi.html'
    })
}
turnToChaoZhi()
    /**
     * 跳转降温
     */
function turnToJiangWen() {
    document.querySelector('.jiangwen').addEventListener('click', function() {
        location.href = 'jiangwen.html'
    })
}
turnToJiangWen()