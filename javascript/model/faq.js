export class FAQ  {
    constructor(question, answer){
        this.question = question;
        this.answer = answer;
    }
    
    showInfor(){
        console.log('Question: ',this.question);
        console.log('Answer: ', this.answer);
    }

}