const ObjectID = require('mongodb').ObjectID;
const userProfiles = 'user-profiles';
let user_object;
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
                cards:[]
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
                    user_object=user;
                    return res.send({
                        user_obj:user,
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
            return res.send(user);
        });
    });

    app.put('/user/add_card/:id?', (req,res) => {
        const body = req.body;
        const UserId = req.params.id;
        const userDetails = db.collection(userProfiles);
        if (body.card_number){
            const updateObj = {_id:new ObjectID(UserId)};
            userDetails.updateOne(
            updateObj,
            { $push : {
                    cards:body
                }}
        )
        .then(result=>{
                res.send({
                    user:updateObj,
                    status:'success',
                    message:'card successfully added'
                })
            })
                .catch(err=>{
                    res.status(400).send({
                        status:'error',
                        message:err
                    })
                })
        } else {
            res.status(400).send({
                status:'error',
                message:'all the fields should be filled'
            });
        }
    });
}