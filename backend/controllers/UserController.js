const User =  require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv-safe').load();

module.exports = {
    async index(req, res){
        const users = await User.find();
        res.json(users);
    },

    async signOn(req, res){
        const { password, name } = req.body;

        const adminExist = await User.findOne({ name:"admin"});

        if (adminExist){
            return res.status(400).send({"error": "admin alreadly exists"});
        }

        const admin = await User.create({
            name, 
            password
        }) 

        console.log("Usuário " + name + " criado com sucesso!" );

        admin.password = undefined;
        
        return res.json({admin, token: generateToken(admin.id)});
    },

    async signIn(req, res){
        
        const { password } = req.body;
        
        const admin  = await User.findOne({name: "admin"}).select('+password');
        
        
        if(!admin){
            return res.status(400).send({"error": "admin not registered"});
        }
        
        
        if(!await bcrypt.compare(password, admin.password)){
            return res.status(400).send({"error": "Invalid PIN"})
        }   

        console.log("Admin logado com sucesso!");

        admin.password = undefined;

        return res.json(generateToken(admin.id));
    }
}

function generateToken(id){
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 86500 // expires in 5min
    });
}