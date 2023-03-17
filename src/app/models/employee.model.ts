export class Employee{
    empId !: number;
    name !: string;
    contact !: string;
    email !: string;
    skillsAndExperience !: { skills : string, experience : string}[];
    gender !: string;

    // Json server id
    id!: number;
}