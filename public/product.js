$(function () {
    let productdiv = $('#productdiv')
    $.get('/products', function (data) {
        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
            
            
            
            // var info = $(`<div  class="col-2 mx-2 pt-2" ></div>`).append(`
            // <div class="card" style="width:200px">
            // <img class="card-img-top" src="${data[i].Image}" alt="iphone x" height="175px" style="width:100%">
            // <div class="card-body">
            // <h4 class="card-header">${data[i].name}</h4>
            // <p class="card-body">Price:${data[i].price}</p>
            // <p class="card-footer">By ${data[i].manufacturer}</p>
            // </div>`)

            var info=$(`<div  class="col-3 mb-5"  ></div>`)
            var maincard=$(`<div class="card" style="width:250px">`)
            var image=$(`<img class="card-img-top" src="/uploads/${data[i].Image}" alt="iphone x" height="175px" style="width:100%">`)
            var cardbody=$(`<div class="card-body">
            <h4 class="card-header">${data[i].name}</h4>
            <p class="card-body">Price:${data[i].price}</p>
            <p class="card-footer">By ${data[i].manufacturer}</p>
            </div>`)
            
            var addtocartbutton = $(`<button class="btn btn-dark addtocart" >Add to Cart</button>`).click(function (e) {
                //console.log(addtocart)
                //console.log(addtocart.parent())
                //console.log(e.target.parentElement.children[0].innerHTML)
                //var item = addtocart.parent().children()[0].innerHTML
                // console.log(e.target)
                // console.log(e.target.parentElement)
                // console.log(e.target.parentElement.children[0])
                // console.log(e.target.parentElement.children[0].children)
                // console.log(e.target.parentElement.children[0].children[1])
                // console.log(e.target.parentElement.children[0].children[1].children[0].innerHTML)
                // console.log(($(this).parent()[0].innerText).split('\n')[0])
                // var item =e.target.parentElement.children[0].children[1].children[0].innerHTML
                console.log(e.target.parentElement.children[1].children[0].innerHTML)
                var item=e.target.parentElement.children[1].children[0].innerHTML
                $.post('/tobeaddedtocart', { name: item }, function (data) {
                    // window.alert('added')

                })
                window.alert('added')
            })

            //info.append(addtocartbutton)
            //productdiv.append(info)
            maincard.append(image,cardbody,addtocartbutton)
            info.append(maincard)

            productdiv.append(info)

        }
    })


    let addtocart = $('.addtocart')
    addtocart.click(function (e) {
        console.log(addtocart)
        console.log(addtocart.parent())
        console.log(e.target.parentElement.children[0].innerHTML)
        //var item = addtocart.parent().children()[0].innerHTML
        var item = e.target.parentElement.children[0].innerHTML
        $.post('/tobeaddedtocart', { name: item }, function (data) {
            console.log(data)

        })

    })
})





