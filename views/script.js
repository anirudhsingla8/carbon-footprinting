let user;
let user_id;
let host_url;
async function registration() {
    try {
        let firstname = document.getElementById("firstname").value;
        let lastname = document.getElementById("lastname").value;
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let email = document.getElementById("email").value;
        let gender = '';
        if (document.getElementById('male').checked) {
            gender = document.getElementById('male').value;
        } else if (document.getElementById('female').checked) {
            gender = document.getElementById('female').value;
        }
        let data = JSON.stringify({
            firstName: firstname,
            lastName: lastname,
            gender: gender,
            username: username,
            email: email,
            password: password
        });
        let res = await fetch('http://127.0.0.1:8080/user/register', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //const myJson = await res.json();
        const myJson = res.json();
        if (res.status == 200){
            //console.log('Success:', JSON.stringify(myJson));
            console.log("the status is "+res.status);
            window.location="login.html";
        } else {
            console.log("the status is "+res.status);
            window.location="error.html";
        }
    }
    catch(error){
        console.log('inside register catch');
        console.error('Error:', error);
    }
}

async function login() {
    try{
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
        let data = JSON.stringify({
            email: email,
            password: password
        });
        await fetch('http://127.0.0.1:8080/user/login', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res=> {
            data = res.json();
            return data;
        })
            .then(res=>{
            user = res.user_obj;
            user_id=user._id;
            console.log(user);
            console.log(user_id);
            window.location="success.html";
            return user;
        });
    }
    catch (error) {
        console.error('Error:', error);
    }
}

// incomplete part
async function add_Card(){
    try{
        user_id='5e131eb4ea0c191cdc06f96b';
        host_url = 'http://127.0.0.1:8080/user/add_card/';
        let link = host_url+user_id;
        let cardNumber = document.getElementById('cardNumber').value;
        let CVV = document.getElementById('CVV').value;
        let expiryYear = document.getElementById('expiryYear').value;
        let food = 0;
        let shopping = 0;
        console.log('inside add_card',link);
        let data = JSON.stringify({
            card_number:cardNumber,
            CVV:CVV,
            expiryYear:expiryYear,
            shopping:shopping,
            food:food
        });
        let xhr = new XMLHttpRequest();
        //xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open("PUT", "http://127.0.0.1:8080/user/add_card/5e131eb4ea0c191cdc06f96b");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
        /*console.log(data);
        await fetch(link, {
            method: 'PUT',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res=>{
            data = res.json();
            return data;
        }).then(res=>{
            console.log(res);
        });*/
    }
    catch (error) {
        console.error('Error:', error);
    }
}


async function fetchCards(){
    let data = '';
    let user_cards;
    let res = await fetch('http://127.0.0.1:8080/user/get_cards/5e131eb4ea0c191cdc06f96b')
        .then(res=>{
            data = res.json();
            return data;
        })
        .then(res=>{
            user = res.data;
            user_cards = user[0].cards;
            //console.log(user_cards);
            //console.log(user_id);
            //window.location="success.html";
            return user_cards;
        })
    console.log(res);
    return res;
    //let UserData = res.json();
    //console.log(UserData);
    /*let xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            UserData = this.responseText;
            console.log(UserData.data[0].firstName);
        }
    });
    xhr.open("GET", "http://127.0.0.1:8080/user/get_cards/5e131eb4ea0c191cdc06f96b");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
    */
}
let createTaskCard = (user) => {
    let cardContainer = document.getElementById('card-container');
    let card = document.createElement('div');
    card.className = 'card shadow cursor-pointer';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h5');
    title.innerText = user.card_number;
    title.className = 'card-title';

    let update_button = document.createElement('button')
    update_button.innerText = 'Update Transactions';

    let list = document.createElement('ul');
    //let list_item = document.createElement('li');
    let shopping = document.createElement('li');
    let food = document.createElement('li');
    food.innerText = "Food : "+user.food;
    shopping.innerText = "Shopping : "+user.shopping;
    //list_item.appendChild(shopping);
    //list_item.appendChild(food);
    list.appendChild(shopping);
    list.appendChild(food);
    cardBody.appendChild(title);
    cardBody.appendChild(list);
    cardBody.appendChild(update_button);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);

    /*let card_columns = document.getElementById('card-columns');
    let card = document.getElementById('card');
    let card_header =document.getElementById('card-header');
    let cardNumber = document.getElementById('cardNumber');
    let cardBody = document.getElementById('card-body');
    let list = document.getElementById('expense-list');
    let li = document.createElement('li');

    cardNumber.innerText=user.card_number;
    let shopping = document.createElement('span');
    let food = document.createElement('span');
    shopping.innerText = 'Shopping expense : '+user.shopping;
    food.innerText = 'food expense : '+user.food;
    li.appendChild(shopping);
    li.appendChild(food);
    list.appendChild(li);
    cardBody.appendChild(list);
    card_header.appendChild(cardNumber);
    card.appendChild(card_header);
    card.appendChild(cardBody);
    //card_columns.appendChild(card);
    console.log(user);*/
}

async function displayCards(){
    /*if (cardContainer){
        document.getElementById('card-container').replaceWith(cardContainer);
        return;
    }*/
    //cardContainer = document.getElementById('card-container');
    let Cards = await fetchCards();

    console.log(Cards.length);
    Cards.forEach((user) => {
       createTaskCard(user);
    });
};