class bookings{
    constructor(book_id, stud_num, lect_num, book_type, book_date, book_start, book_end, book_loc, book_det){
        this.booking_id = book_id;
        this.student_number =stud_num;
        this.lecturer_num = lect_num;
        this.type = book_type;
        this.date = book_date;
        this.start = book_start;
        this.end = book_end;
        this.location = book_loc;
        this.details = book_det;
    } //constr
}
export default bookings; //allows use in another file