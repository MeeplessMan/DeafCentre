class students{
    constructor(stud_num, stud_email, stud_first, stud_last, stud_phno, stud_hearlvl, stud_year, stud_cc){
        this.student_num = stud_num;
        this.user_email = stud_email;
        this.firstname = stud_first;
        this.lastname = stud_last;
        this.phonenum = stud_phno;
        this.hearinglevel = stud_hearlvl;
        this.year = stud_year;
        this.coursecode = stud_cc;
    }//constructor
}
export default students;//allows use to other files