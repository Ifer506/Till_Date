const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const path = require("path");
const { pool } = require("../../db");


const addProduct = (req,res) =>{
    try{
        const {itemid,itemName, desc, quantity ,category,Weight,purchasePrice, sellingprice } = req.body;

    }catch{}

}

const deleteProduct =(req,res) =>{}

const varProduct = (req,res) =>{}


module.exports = {addProduct};