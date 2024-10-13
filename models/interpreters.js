class interpreters{
    constructor(interp_id, interp_first, interp_last, interp_email, interp_phno, interp_status, interp_rating){
        this.interpreter_id = interp_id;
        this.firstname = interp_first;
        this.lastname = interp_last;
        this.user_email = interp_email;
        this.phonenum = interp_phno;
        this.status = interp_status;
        this.rating = interp_rating;
    }//constructor = initial values
}
export default interpreters; //allow use in another file