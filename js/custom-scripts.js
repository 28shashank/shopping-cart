		
    const decreaseNumber = (incdec, itemprice) => {

        var product_total_amt = document.getElementById('product_total_amt');
        var discount = document.getElementById('discount');
        var type_discount = document.getElementById('type_discount');
        var total_cart_amt = document.getElementById('total_cart_amt');

        var itemval = document.getElementById(incdec);
        var itemprice = document.getElementById(itemprice);
        //console.log(itemval.value);

        if(itemval.value <= 1) {
            itemval.value = 1;
            alert('0 Qty not allowed.');
        } else {
            itemval.value = parseInt(itemval.value) - 1;
            itemval.style.background = "#ffffff";
            itemval.style.color = "#9b9b9b";
            itemprice.innerHTML = parseInt(itemprice.innerHTML) - 15;
            product_total_amt.innerHTML = parseInt(product_total_amt.innerHTML) - 15;
            total_cart_amt.innerHTML = parseInt(product_total_amt.innerHTML) + parseInt(discount.innerHTML) + parseInt(type_discount.innerHTML);
        }

    } 

    const increaseNumber = (incdec, itemprice) => {
        var itemval = document.getElementById(incdec);
        var itemprice = document.getElementById(itemprice);
        //console.log(itemval.value);

        if(itemval.value >= 5) {
            itemval.value = 5;
            alert('Max 5 Qty allowed.');
            itemval.style.background = "#e3505c";
            itemval.style.color = "#ffffff";
        } else {
            itemval.value = parseInt(itemval.value) + 1;
            itemprice.innerHTML = parseInt(itemprice.innerHTML) + 15;
            product_total_amt.innerHTML = parseInt(product_total_amt.innerHTML) + 15;
            total_cart_amt.innerHTML = parseInt(product_total_amt.innerHTML) + parseInt(discount.innerHTML) + parseInt(type_discount.innerHTML);
        }
    } 


    fetch(`./cart[2].json`, {mode: 'cors'})
    .then ( (apidata) => {
        //console.log(apidata);
        return apidata.json();
    })
    .then ( (actualdata) => {
        //console.log(actualdata);

        var data2 = actualdata;

        //console.log(data2.items);
        //console.log(data2.items[0].name);
        //console.log(data2.items[0].price.actual);

        //items list in left side
        for(i = 0; i < data2.items.length; i++){
            let itemObj = data2.items[i];
            //console.log(itemObj);
            //console.log(itemObj.name);
            
            document.getElementById('itemlistapi').innerHTML += `
            
                <!--console.log(${data2.items[i].name});-->
                
                <li class="productContainer" id="productContainer${i}">
                    <div class="item-img productimg">
                        <img src="${data2.items[i].image}" class="img" alt="" />
                        <div class="badge-overlay">
                            <span class="middle badge green">15% off</span>
                        </div>
                    </div>
                    <div class="price-add-to-cart">
                        <div class="name productTitle">${data2.items[i].name}</div>
                        <div>
                            <div class="offer-price">
                                <span class="strike-through">
                                    <span class="grey">$${data2.items[i].price.display}</span>
                                </span>
                                <span class="price"> $${data2.items[i].price.actual}</span>
                            </div>
                            <div class="add-to-cart-btn"><button type="button" data="${itemObj.image} ${itemObj.name} ${itemObj.price.display} ${itemObj.price.actual}" onclick="addItemInCart(this.id)" id="${i}" class="btn btn-outline">Add to cart</button></div>
                        </div>
                    </div>
                </li>
                
            `;
                
            //item details in cart section
            window.addItemInCart = function (clicked_id) {

                //alert(clicked_id);
                //console.log(datacart); return;
                //console.log(data2.items[1].price.actual);

                var count = document.getElementById("itemDetailsContainer").childElementCount; 
                    //console.log(count + 1);
                    document.getElementById("itemSelectedCount").innerHTML = `${count + 1}`;
                    document.getElementById("itemTotalSelected").innerHTML = `${count + 1}`;

                document.getElementById("itemDetailsContainer").innerHTML += `
                <div class="row" id="itemRow${count}">
                    <div class="col-4 items-details"> 
                        <div class="item">
                            <span class="cartImage"><img src="${data2.items[clicked_id].image}" alt="" /></span>
                            <span class="cartTitle">${data2.items[clicked_id].name}</span>
                            <span><button class="remove"><i class="fas fa-times"></i></button></span>
                        </div>
                    </div>
                    <div class="col-4 items-details"> 
                        <ul class="spinner justify-content-end set_quantity">
                            <li class="spinner-item">
                                <button class="spinner-link" onclick="decreaseNumber('textbox${clicked_id}', 'itemval${clicked_id}')"><i class="fas fa-minus"></i></button>
                            </li>
                            <li class="spinner-item">
                                <input type="text" name="" class="spinner-link" value="1" id="textbox${clicked_id}">
                            </li>
                            <li class="spinner-item">
                                <button class="spinner-link" onclick="increaseNumber('textbox${clicked_id}', 'itemval${clicked_id}')"><i class="fas fa-plus"></i></button>
                            </li>
                        </ul>
                    </div>
                    <div class="col-4 items-details txt-center"> 
                        <h3>$<span id="itemval${clicked_id}">${data2.items[clicked_id].price.actual}</span></h3>
                    </div>
                    
                </div>
                `;

            }

        }


    })
    .catch ( (error) => {
        console.log (`The Error: ${error}`);
    });
