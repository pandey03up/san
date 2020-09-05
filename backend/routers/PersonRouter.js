const express = require('express');
const mongoose = require('mongoose');
const Person = require('../schema/Person');
const bcrypt = require('bcrypt')

const route = express.Router()

route.post('/signup',async(req,res)=>{
    const {username,password,type} = req.body
    const hash = await bcrypt.hash(password,10)
    try{
        const person = await Person.find({username:username.toLowerCase()})
        if (person.length >= 1){
            return res.send({found:true})
        }
        const newPerson = new Person({
            _id : new mongoose.Types.ObjectId(),
            username:username.toLowerCase(),
            password:hash,
            type
        })
        await newPerson.save()
        res.send({status:'successful',type:type,found:false})
    }catch(err){
        res.send(err)
    }
})
route.post('/login',async(req,res)=>{
    const {username,password} = req.body
    try{
        const person = await Person.find({username:username.toLowerCase()})
        if (person.length <= 0){
            return res.send({found : false})
        }
        const isMatched = await bcrypt.compare(password,person[0].password)
        if(!isMatched){
            return res.send({password: false,found:true})
        }
        res.send({password:true,type:person[0].type,found:true})
    }catch(err){
        res.send(err)
    }
})

module.exports = route 