const Category = require('../models/category')
const Subcategory = require('../models/subcategory')
const addsubpage = async(req,res) => {
    try {
        const category = await Category.find({})
        res.render('Subcategory/add_subcategory',{
            category:category
        })
    } catch (error) {
        console.log(error);
        return false
    }
}
const viewsubpage = async(req,res) => {
    try {
        const subcategory = await Subcategory.find({}).populate('categoryId')
        res.render('Subcategory/view_subcategory',{
            subcategory : subcategory
        })
    } catch (error) {
        console.log(error);
        return false
    }
}
const addsubcategory = async(req,res) => {
    try {
        const {category,subcategory} = req.body
        let newsubcategory = new Subcategory({
            categoryId : category,
            name : subcategory
        })
        await newsubcategory.save()
        res.redirect('/subcategory/view')
    } catch (error) {
        console.log(error);
        return false
    }
}
const deletesubcategory = async(req,res) => {
    try {
        const id = req.query.id
        await Subcategory.findByIdAndDelete(id)
        res.redirect('/subcategory/view')
    } catch (error) {
        console.log(error);
        return false
    }
}
const updatesubcategory = async(req,res) => {
    try {
        const {id,category,subcategory} = req.body
        console.log(req.body);
        
        await Subcategory.findByIdAndUpdate(id,{
            categoryId : category,
            name:subcategory
        })
        res.redirect('/subcategory/view')
    } catch (error) {
        console.log(error);
        return false
    }
}
const editsubpage = async(req,res) => {
    try {
        const id = req.query.id
        const category = await Category.find({})
        const subcategory = await Subcategory.findById(id).populate('categoryId')
        res.render('Subcategory/edit_subcategory',{
            category:category,
            subcategory:subcategory
        })
    } catch (error) {
        console.log(error);
        return false
    }
}
module.exports = {
    addsubpage,viewsubpage,addsubcategory,deletesubcategory,editsubpage,updatesubcategory
}