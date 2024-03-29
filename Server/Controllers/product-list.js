"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessFindProductsByKeyword = exports.ProcessDeletePage = exports.ProcessEditPage = exports.ProcessAddPage = exports.DisplayEditPage = exports.DisplayAddPage = exports.DisplayProductList = void 0;
const product_1 = __importDefault(require("../Models/product"));
function DisplayProductList(req, res, next) {
    product_1.default.find(function (err, productCollection) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, msg: 'Product List display Successfully ', product: productCollection, user: req.user });
    });
}
exports.DisplayProductList = DisplayProductList;
function DisplayAddPage(req, res, next) {
    res.json({ success: true, msg: 'Add Page  display Successfully ' });
}
exports.DisplayAddPage = DisplayAddPage;
function DisplayEditPage(req, res, next) {
    let id = req.params.id;
    product_1.default.findById(id, {}, {}, function (err, productToEdit) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, msg: 'Edit Page Displayed Successfully ', product: productToEdit });
    });
}
exports.DisplayEditPage = DisplayEditPage;
function ProcessAddPage(req, res, next) {
    let newProduct = new product_1.default({
        "Name": req.body.productName,
        "Description": req.body.productDescription,
        "Price": req.body.productPrice,
        "Quantity": req.body.productQuantity,
        "Category": req.body.productCategory
    });
    product_1.default.create(newProduct, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, msg: 'Successfully Added Product', product: newProduct });
    });
}
exports.ProcessAddPage = ProcessAddPage;
function ProcessEditPage(req, res, next) {
    let id = req.params.id;
    let updatedProduct = new product_1.default({
        "_id": id,
        "Name": req.body.productName,
        "Description": req.body.productDescription,
        "Price": req.body.productPrice,
        "Quantity": req.body.productQuantity,
        "Category": req.body.productCategory
    });
    product_1.default.updateOne({ _id: id }, updatedProduct, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, msg: 'Successfully Updated Product', product: updatedProduct });
    });
}
exports.ProcessEditPage = ProcessEditPage;
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    product_1.default.remove({ _id: id }, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, msg: 'Successfully Deleted Product' });
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
function ProcessFindProductsByKeyword(req, res, next) {
    try {
        const keyword = encodeURIComponent(req.params.keyword);
        console.log('Keyword:', keyword);
        product_1.default.find({ Name: ({ $regex: new RegExp(keyword, 'i') }) }, function (err, matchingProducts) {
            if (err) {
                console.error(err);
                res.status(500).send({ error: 'Internal Server Error' });
                return;
            }
            res.send({ matchingProducts });
        });
    }
    catch (error) {
        console.error('Error in ProcessFindProductsByKeyword:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}
exports.ProcessFindProductsByKeyword = ProcessFindProductsByKeyword;
//# sourceMappingURL=product-list.js.map