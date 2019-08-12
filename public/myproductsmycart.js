$(function () {
    $.get('/addtocart', function (data) {
        printing(data)
        checkout(data)
    })
    

})

function printing(data) {
    var myproduct = $('#myproducts')
    myproduct.empty()
    for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        console.log(data[i].name)
        var item = $('<div class="col-3"></div>').append(`
        <span>${data[i].name}</span>
        `)
        var price = $('<div class="col-3"></div>').append(`
        <span>${data[i].price}</span>
        `)
        var quantity = $('<div class="col-2"></div>').append(`
        <span>${data[i].quantity}</span>
        `)
        var tota=(data[i].price)*(data[i].quantity)
        var subtotal = $('<div class="col-2"></div>').append(`
        <span>${tota}</span>
        `)

        const del = $(`<button class=" addtocart" >Delete</button>`).click(function (e) {
            console.log($(this).parent()[0].innerText.split('\n')[0])
            console.log($(this).parent()[0].children[0].innerText)
            var item = $(this).parent()[0].innerText.split('\n')[0]
            $.post('/deletefromcart', { name: item }, function (data) {

                console.log(data)
                printing(data)
                checkout(data)

            })

        })
    //     var check=$('#checkout')
    // var subtotal=0;
    // check.empty()
    // for(let i=0;i<data.length;i++)
    // {
    //     subtotal+=data[i].price
    // }
    // var total=0;
    // total=0.18*subtotal+subtotal

    // var sub=$(`<span>subtotal=Rs ${subtotal}</span>`)
    // var tot=$(`<br><span>total=Rs ${total}</span>`)
    // var a=$('<br><a class="btn btn-dark" href="/payment">Go to secure checkout</a>')
    
    // check.append(sub,tot,a)
        myproduct.append(item, price, quantity, subtotal, del)
    }
}



function checkout(data){
    var check=$('#checkout')
    var subtotal=0;
    check.empty()
    for(let i=0;i<data.length;i++)
    {
        subtotal+=(data[i].price)*(data[i].quantity)
    }
    var total=0;
    total=0.18*subtotal+subtotal

    var sub=$(`<span>subtotal=Rs ${subtotal}</span>`)
    var tot=$(`<br><span>total=Rs ${total}</span>`)
    var a=$('<br><a class="btn btn-dark" href="/payment">Go to secure checkout</a>')
    
    check.append(sub,tot,a)

}