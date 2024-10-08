const Category = require('../models/category')
const addcategoryPage = async(req,res) => {
    try {
        res.render('Category/add_category')
    } catch (error) {
        console.log(error);
        return false
    }
}
const addcategory = async(req,res) => {
    try {
        const {category} = req.body
        const categoryExist = await Category.findOne({category})
        if(categoryExist) {
            return res.status(400).json({message: "Category already exist"})
        }
        const newcategory = await new Category({
            name : category
        })
        await newcategory.save()
        res.redirect('/category/view')
    } catch (error) {
        console.log(error);
        return fasle
    }
}
const viewcategorypage = async(req,res) => {
    try {
        const categories = await Category.find({})
        res.render('Category/view_category',{
            categories : categories
        })
    } catch (error) {
        console.log(error);
        return false
    }
}
const deletecategory = async(req,res) => {
    try {
        const id = req.query.id
        await Category.findByIdAndDelete(id)
        res.redirect('/category/view')
    } catch (error) {
        console.log(error);
        return false
    }
}
const updatecategory = async(req,res) => {
    try {
        const {category,id} = req.body
        console.log(id);
        
        await Category.findByIdAndUpdate(id,{
            name : category
        })
        res.redirect('/category/view')
    } catch (error) {
        console.log(error);
        return false
    }
}
const editcategorypage = async(req,res) => {
    try {
        const id = req.query.id
        const category = await Category.findById(id)
        res.render('Category/edit_category',{
            category : category
        })
    } catch (error) {
        
    }
}
module.exports = {
    addcategoryPage,addcategory,viewcategorypage,deletecategory,updatecategory,editcategorypage
}