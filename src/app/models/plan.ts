export class Plans{
    id:string;
    plan:string;
    bookIssueLimit:string;
    bookReturnPeriod:string;
    price:string;

    constructor(plan: string, bookIssueLimit:string, bookReturnPeriod:string, price:string){
        this.plan = plan;
        this.bookIssueLimit = bookIssueLimit;
        this.bookReturnPeriod = bookReturnPeriod;
        this.price = price;
    }
}