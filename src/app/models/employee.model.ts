export class Employee{
    empId !: string;
    name !: string;
    contact !: string;
    email !: string;
    skillsAndExperience !: { skills : string, experience : string}[];
    gender !: string;

    // Json server id
    id!: number;
}