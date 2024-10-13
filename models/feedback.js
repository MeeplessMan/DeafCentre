class feedback{
    constructor(acc_id, book_id, fdbck_booker, fdbck_interp_rating, fdbck_interp){
        this.accepted_id = acc_id;
        this.booking_id = book_id;
        this.booker = fdbck_booker;
        this.interpreter_rating = fdbck_interp_rating;
        this.interpreter = fdbck_interp;
    }///constr

}
export default feedback; //allows the model to be used in other files