module.exports = function(model) {
    const addModels = function (req,res,next) {
        req.model= model;
        return next();
    };
    return addModels;
};

