

async function registration() {
    try {
        console.log('inside register try');
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
        console.log("result is",res);
        console.log('Success:', JSON.stringify(myJson));
        res.redirect('login.html');

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
        let res = await fetch('http://127.0.0.1:8080/user/login', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("result is",res);
    }
    catch (error) {
        console.error('Error:', error);
    }

}
