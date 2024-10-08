const Category = require('../models/category')
const Subcategory = require('../models/subcategory')
const Exsubcategory = require('../models/exsubcategory')
const addexsubpage = async(req,res) => {
    try {
        const category = await Category.find({})
        const subcategory = await Subcategory.find({})
        res.render('Exsubcategory/add_exsubcategory',{
            category:category,
            subcategory:subcategory
        })
    } catch (error) {
        
    }
}
const viewexsubpage = async(req,res) => {
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
const addexsubcategory = async(req,res) => {
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
const deletexsubcategory = async(req,res) => {
    try {
        const id = req.query.id
        await Exsubcategory.findByIdAndDelete(id)
        res.redirect('/exsubcategory/view')
    } catch (error) {
        console.log(error);
        return false
    }
}
const updateexsubcategory = async(req,res) => {
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
const editexsubpage = async(req,res) => {
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
    addexsubpage,viewexsubpage,addexsubcategory,deletexsubcategory,updateexsubcategory,editexsubpage
}