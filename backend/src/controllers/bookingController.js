import {Property} from "../Models/propertyModel.js";
import {Booking} from "../Models/bookingModel.js";
//createorder : booking my property
const createOrder = async(req,res)=>{
    const {amount,propertyId,fromDate,toDate,guests} =req.body;

    //orderID
    const orderId = "order_"+ Date.now();
    res.json({
        success:true,
        message:"Order created SUccessfully",
        orderId,
        amount,
        propertyId,
        fromDate,
        toDate,
        guests

    })
}
//verify payment
//25,26
// 1.save the booking
//2.Block these dates
const verifyPayment = async (req, res) => {
    try {
        const { orderId, bookingDetails, forceStatus } = req.body;

        if (forceStatus === "success") {
            const paymentId = "Pay_" + Date.now();

            // Save the booking
            const newBooking = await Booking.create({
                user: req.user._id,
                property: bookingDetails.propertyId,
                price: bookingDetails.price,
                fromDate: bookingDetails.fromDate,
                toDate: bookingDetails.toDate,
                guests: bookingDetails.guests,
                numberOfnights: bookingDetails.nights,
                paid: true
            });

            // Tell property those dates are taken
            const updatedProperty = await Property.findByIdAndUpdate(
                bookingDetails.propertyId,
                {
                    $push: {
                        currentBookings: {
                            bookingId: newBooking._id,
                            fromDate: bookingDetails.fromDate,
                            toDate: bookingDetails.toDate,
                            userId: req.user._id
                        }
                    }
                },
                {
                    returnDocument: "after"
                }
            );

            res.status(200).json({
                success: true,
                message: "Payment successful, booking confirmed!!",
                paymentId,
                orderId,
                booking: newBooking
            });

        } else {
            res.status(400).json({
                success: false,
                message: "Payment failed!",
                orderId
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// get my bookings
const getUserBookings = async(req,res)=>{
    try{
        const bookings = await Booking.find({user:req.user._id})
        res.status(200).json({
            status:"success",
            data:{
                bookings
            }
        })

    }catch(error){
        res.status(401).json({
            status:"fail",
            message:error.message
        })

    }
}
// get one booking details
const getBookingDetails = async(req,res)=>{
    try{
        const bookings = await Booking.findById(req.params.bookingId);

        res.status(200).json({
            status:"success",
            data:{
                bookings
            }
        })

    }catch(error){

        res.status(401).json({
            status:"fail",
            message:error.message
        })
    }
}
export{getBookingDetails,getUserBookings,createOrder,verifyPayment};