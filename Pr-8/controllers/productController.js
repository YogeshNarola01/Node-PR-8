const Category = require('../models/category')
const Subcategory = require('../models/subcategory')
const Exsubcategory = require('../models/exsubcategory')
const addproductpage = async(req,res) => {
    try {
        const category = await Category.find({})
        const subcategory = await Subcategory.find({})
        const exsubcategory = await Exsubcategory.find({})
        res.render('Product/add_product',{
            category:category,
            subcategory:subcategory,
            exsubcategory:exsubcategory
        })
    } catch (error) {
        console.log(error);
        return false
    }
}
const viewproductpage = async(req,res) => {
    try {
        const exsubcategory =await Exsubcategory.find({}).populate('categoryId').populate('subcategoryId')
        console.log(exsubcategory);
        
        res.render('Exsubcategory/view_exsubcategory',{
           exsubcategory : exsubcategory
        })
    } catch (error) {
        console.log(error);
        return false
    }
}
const addproduct = async(req,res) => {
    try {
        const {category,subcategory,exsubcategory} = req.body
        const newexsubcategory = new Exsubcategory({
            categoryId:category,
            subcategoryId:subcategory,
            name: exsubcategory
        })
        await newexsubcategory.save()
        res.redirect('/exsubcategory/view')
    } catch (error) {
        console.log(error);
        return false
    }
}
const deleteproduct = async(req,res) => {
    try {
        const id = req.query.id
        await Exsubcategory.findByIdAndDelete(id)
        res.redirect('/exsubcategory/view')
    } catch (error) {
        console.log(error);
        return false
    }
}
const updateproduct = async(req,res) => {
    try {
        const {id,category,subcategory,exsubcategory} = req.body
        console.log(id);
        await Exsubcategory.findByIdAndUpdate(id,{
            categoryId:category,
            subcategoryId:subcategory,
            name:exsubcategory
        })
        res.redirect('/exsubcategory/view')
    } catch (error) {
        console.log(error);
        return false
    }
}
const editproduct = async(req,res) => {
    try {
        const id = req.query.id
        const category = await Category.find({})
        const subcategory = await Subcategory.find({})
        const exsubcategory = await Exsubcategory.findById(id).populate('categoryId').populate('subcategoryId')
        console.log(exsubcategory);
        
        res.render('Exsubcategory/edit_exsubcategory',{
            category:category,
            subcategory:subcategory,
            exsubcategory:exsubcategory
        })
    } catch (error) {
        console.log(error);
        return false
    }
}
module.exports = {
    addproductpage,viewproductpage,addproduct,deleteproduct,updateproduct,editproduct
}