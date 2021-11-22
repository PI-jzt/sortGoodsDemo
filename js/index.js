//获取商品数据
(function() {
    let data = null;
    let xmlReq = new XMLHttpRequest;
    xmlReq.open("GET", "json/phoneList.json", false);
    xmlReq.onreadystatechange = function() {
        if (xmlReq.status == 200 && xmlReq.readyState == 4) {
            data = xmlReq.responseText;
        }
    };
    xmlReq.send();
    let carlist = document.querySelector(".carlist");
    let arr = [];
    JSON.parse(data).forEach((item) => {
        arr.push(`
    <div class="col mb-3 " data-price='${item.price}'  data-putData='${item.putData}' data-evalNum='${item.evalNum}'>
                  <div class="card v-100">
                      <img src="${item.imgUrl}" class="card-img-top" alt="...">
                      <div class="card-body">
                          <h6 class="card-title">${item.title}</h6>
                          <p class="card-text p-price">${item.price}</p>
                          <p class="p-giveAway"><span>赠送积分</span></p>
                          <p class="p-eval">
                              <em><span>${item.evalNum}</span>人评价</em>
                              <em><span>99</span>%好评</em>
                          </p>
                          <p class="p-putDate">上架时间：<span>${item.putData}</span></p>
                      </div>
                  </div>
              </div>
  
    `);
    });
    carlist.innerHTML = arr.join("");
})()

let priceSortEl = document.querySelector('.priceSort')

let carlist = document.querySelector('.carlist')

let dataList = document.querySelectorAll('.col')

dataList = Array.prototype.slice.call(dataList, 0)


priceSortEl.onclick = function() {
    this['priceSortStatu'] = this['priceSortStatu'] ? this['priceSortStatu'] : -1
    this['priceSortStatu'] *= -1
    dataList.sort((m, n) => {
            return this['priceSortStatu'] * (m.getAttribute("data-price") - n.getAttribute("data-price"))
        })
        //往元素内末尾添加排序后的元素,利用了dome的映射机制
    dataList.forEach(item => carlist.appendChild(item))
}
let putDateEl = document.querySelector('.putDate')
putDateEl.onclick = function() {
    this['clickStatu'] = this['clickStatu'] ? this['clickStatu'] : -1
    this['clickStatu'] *= -1
    dataList.sort((m, n) => {
            return this['clickStatu'] * (m.getAttribute("data-putData").replace(/-/g, '') - n.getAttribute("data-putData").replace(/-/g, ''))
        })
        //往元素内末尾添加排序后的元素,利用了dome的映射机制
    dataList.forEach(item => carlist.appendChild(item))

}
let hotSortEL = document.querySelector('.hotSort')

hotSortEL.onclick = function() {
    this['hotSortStatu'] = this['hotSortStatu'] ? this['hotSortStatu'] : -1
    this['hotSortStatu'] *= -1
    dataList.sort((m, n) => {
        return this['hotSortStatu'] * (m.getAttribute("data-evalNum") - n.getAttribute("data-evalNum"))
    })

    //往元素内末尾添加排序后的元素,利用了dome的映射机制
    dataList.forEach(item => carlist.appendChild(item))
}