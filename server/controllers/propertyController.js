const mongoose = require("mongoose");
const Property = require("../models/property");



// @desc Create a new property
// @route POST /api/properties
const createProperty = async (req, res) => {

    try {

        const {
            title,
            price,
            location,
            description,
            imageUrl
        } = req.body;



        if (
            !title ||
            !price ||
            !location ||
            !description ||
            !imageUrl
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "All property fields are required"

            });

        }




        const property = await Property.create(req.body);



        res.status(201).json({

            success: true,

            data: property

        });



    } catch (error) {


        res.status(400).json({

            success: false,

            message: error.message

        });


    }

};








// @desc Get all properties with search/filter/sort
// @route GET /api/properties
const getProperties = async (req, res) => {


    try {


        const {
            search,
            minPrice,
            maxPrice,
            sort
        } = req.query;




        let query = {};




        if (search) {


            query.$or = [


                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },


                {
                    location: {
                        $regex: search,
                        $options: "i"
                    }
                },


                {
                    description: {
                        $regex: search,
                        $options: "i"
                    }
                }


            ];


        }






        if (minPrice || maxPrice) {


            query.price = {};



            if (minPrice) {

                query.price.$gte =
                    Number(minPrice);

            }



            if (maxPrice) {

                query.price.$lte =
                    Number(maxPrice);

            }


        }







        let propertiesQuery =
            Property.find(query);






        if (sort === "priceAsc") {


            propertiesQuery =
                propertiesQuery.sort({
                    price: 1
                });



        } else if (sort === "priceDesc") {


            propertiesQuery =
                propertiesQuery.sort({
                    price: -1
                });



        } else {


            propertiesQuery =
                propertiesQuery.sort({
                    createdAt: -1
                });


        }






        const properties =
            await propertiesQuery;




        res.status(200).json({

            success: true,

            count: properties.length,

            data: properties

        });





    } catch (error) {


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};










// @desc Get single property
// @route GET /api/properties/:id
const getProperty = async (req,res)=>{


    try {



        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {


            return res.status(400).json({

                success:false,

                message:
                    "Invalid property ID"

            });


        }





        const property =
            await Property.findById(req.params.id);




        if (!property) {


            return res.status(404).json({

                success:false,

                message:
                    "Property not found"

            });


        }




        res.status(200).json({

            success:true,

            data:property

        });





    } catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};










// @desc Update property
// @route PUT /api/properties/:id
const updateProperty = async(req,res)=>{


    try {


        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {


            return res.status(400).json({

                success:false,

                message:
                    "Invalid property ID"

            });


        }





        const property =
            await Property.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new:true,
                    runValidators:true
                }

            );





        if (!property) {


            return res.status(404).json({

                success:false,

                message:
                    "Property not found"

            });


        }




        res.status(200).json({

            success:true,

            data:property

        });






    } catch(error){


        res.status(400).json({

            success:false,

            message:error.message

        });


    }


};











// @desc Delete property
// @route DELETE /api/properties/:id
const deleteProperty = async(req,res)=>{


    try {


        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {


            return res.status(400).json({

                success:false,

                message:
                    "Invalid property ID"

            });


        }






        const property =
            await Property.findByIdAndDelete(
                req.params.id
            );





        if (!property) {


            return res.status(404).json({

                success:false,

                message:
                    "Property not found"

            });


        }





        res.status(200).json({

            success:true,

            message:
                "Property deleted successfully"

        });





    } catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};






module.exports = {

    createProperty,

    getProperties,

    getProperty,

    updateProperty,

    deleteProperty

};