const ObjectID = require('mongodb').ObjectID;
const userProfiles = 'user-profiles';
module.exports = function (app,db) {
    // post request to create user registration details
    app.post('/user/register', (req, res) => {
        const body = req.body;
        if(body && body.username && body.firstName && body.lastName && body.email && body.password && body.gender){
            const userDetails = db.collection(userProfiles);
            userDetails.insert({
                firstName : body.firstName,
                lastName : body.lastName,
                gender : body.gender,
                username: body.username,
                email : body.email,
                password: body.password,
            })
                .then(result => {
                    res.send({
                        status:'success',
                        message:'user registration successful',
                    })
                })
                .catch(err => {
                    res.status(400).send({
                        status:'error',
                        message:err
                    })
                })
        } else{
            res.status(400).send({
                status:'error',
                message:'all the fields should be filled'
            });
        }
    });

    // login for user
    app.post('/user/login', (req,res,next) => {
        const body = req.body;
        let email = body.email;
        let password = body.password;
        const userDetails = db.collection(userProfiles);
        userDetails.findOne({email: email}, function(err, user) {
            if(err) {
                return next(err);
            }
            else if(!user) {
                return res.status(400).send({
                    status:'error',
                    message:'user does not exist'
                })
                //res.send('user not found');
            }
            else{
                if(user.password==password){
                    return res.send({
                        status:'success',
                        message:'Successfully logged in'
                    })
                    //res.send('logged in');
                } else {
                    return res.status(400).send({
                        status:'error',
                        message:'Wrong Password'
                    })
                    //res.send('wrong password');
                }
            }
            req.session.user = email;
            return res.send('Logged In!');
        });


       /* userDetails.findOne({
            username: username,
            password: password
        })
            .then(result => {
                res.send({
                    status: 'success',
                    message: 'user successfully logged in'
                })
            })
            .catch(err => {
                res.status(400).send({
                    status: 'error',
                    message: err
                })
            })*/

    });

}