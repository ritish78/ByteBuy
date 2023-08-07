const User = require('../models/User');
const asyncHandler = require('./../middleware/asyncHandler');
const Address = require('./../models/Address');

const ADDRESS_PER_PAGE = 10;


// @route       POST /api/address
// @desc        Create an address for the user
// @access      Private
const createShippingAddress = asyncHandler(async (req, res) => {
    const {
        apartmentNumber,
        street,
        city,
        state,
        postalCode,
        country
    } = req.body;

    const addressToSave = new Address({
        user: req.user._id,
        apartmentNumber,
        street,
        city,
        state,
        postalCode,
        country
    });

    const savedAddress = await addressToSave.save();

    return res.status(201).json(savedAddress);
})


// @route       GET /api/address
// @desc        Get shipping address order of the user
// @access      Private
const getAddressOfCurrentUser = asyncHandler(async (req, res) => {
    const address = await Address.findOne({ user: req.user._id });

    if (address) {
        return res.status(200).json(address);
    } else {
        res.status(404);
        throw new Error('Address not found!');
    }
})

// @route       GET /api/address/:userId/user
// @desc        Get shipping address order of the user
// @access      Private
const getAddressOfUserByUserId = asyncHandler(async (req, res) => {
    const address = await Address.findOne({ user: req.params.id });

    if (address) {
        return res.status(200).json(address);
    } else {
        res.status(404);
        throw new Error('Address not found!');
    }
})


// @route       GET /api/address/:id
// @desc        Get shipping address by address id
// @access      Private
const getShippingAddressById = asyncHandler(async (req, res) => {
    const address = await Address.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (address) {
        if (address.user.toString() === req.user._id.toString() || currentUser.isAdmin) {
            return res.status(200).json(address);
        } else {
            res.status(401);
            throw new Error('User is not authorized to view this shipping address!');
        }
    } else {
        res.status(404);
        throw new Error('Address not found!');
    }
})


// @route       POST /api/address/:id/update
// @desc        Update an address by using its id
// @access      Private
const updateShippingAddressById = asyncHandler(async (req, res) => {
    const addressToUpdate = await Address.findById(req.params.id);

    if (!addressToUpdate){
        res.status(404);
        throw new Error('Could not update the address. Address does not exists!');
    }

    if (addressToUpdate.user.toString() != req.user._id.toString()) {
        res.status(401);
        throw new Error('User is not authorized to edit the address!');
    } 

    addressToUpdate.apartmentNumber = req.body.apartmentNumber || addressToUpdate.apartmentNumber;
    addressToUpdate.street = req.body.street || addressToUpdate.street;
    addressToUpdate.city = req.body.city || addressToUpdate.city;
    addressToUpdate.state = req.body.state || addressToUpdate.state;
    addressToUpdate.postalCode = req.body.postalCode || addressToUpdate.postalCode;
    addressToUpdate.country = req.body.country || addressToUpdate.country;

    await addressToUpdate.save();

    return res.status(200).json({
        _id: addressToUpdate._id,
        apartmentNumber: addressToUpdate.apartmentNumber,
        street: addressToUpdate.street,
        city: addressToUpdate.city,
        state: addressToUpdate.state,
        postalCode: addressToUpdate.postalCode,
        country: addressToUpdate.country
    })
})


// @route       DELETE /api/address
// @desc        Delete shipping address of the user
// @access      Private
const deleteAddressOfCurrentUser = asyncHandler(async (req, res) => {
    const addressToBeDeleted = await Address.findOne({ user: req.user._id });

    if (addressToBeDeleted.user.toString() === req.user._id.toString()) {
        await Address.deleteMany({ user: req.user._id });
        return res.status(200).json({ message: 'Address Deleted!' });
    } else {
        res.status(401);
        throw new Error('User is not authorized to delete this address!');
    }
})


// @route       DELETE /api/address/:id
// @desc        Delete shipping address by id
// @access      Private
const deleteAddressById = asyncHandler(async (req, res) => {
    const addressToBeDeleted = await Address.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (addressToBeDeleted.user.toString() === req.user._id.toString() || currentUser.isAdmin) {
        await Address.deleteMany({ user: req.user._id });
        return res.status(200).json({ message: 'Address Deleted!' });
    } else {
        res.status(401);
        throw new Error('User is not authorized to delete this address!');
    }
})


// @route       GET /api/address/all
// @desc        Get all shipping address
// @access      Private
const getAllShippingAddress = asyncHandler(async (req, res) => {
    const currentPage = parseInt(req.query.pageNumber) || 1;
    const addressCount = await Address.countDocuments();

    const address = await Address.find({})
                                    .limit(ADDRESS_PER_PAGE)
                                    .skip((currentPage - 1) * ADDRESS_PER_PAGE)
                                    .populate('user', 'id name');

    if (address) {
        return res.status(200).json({
            address,
            currentPage,
            pages: Math.ceil(addressCount / ADDRESS_PER_PAGE)
        });
    } else {
        res.status(404);
        throw new Error('Address not found!');
    }
})


module.exports = {
    createShippingAddress,
    getAddressOfCurrentUser,
    getAddressOfUserByUserId,
    getShippingAddressById,
    updateShippingAddressById,
    deleteAddressOfCurrentUser,
    deleteAddressById,
    getAllShippingAddress
}