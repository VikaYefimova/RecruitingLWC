import { LightningElement, track } from 'lwc';

export default class SearchRecords extends LightningElement {
    @track name;
    @track salary;
    @track operator;

    handleNameChange(event){
        this.name = event.target.value;
    }
    handleSalaryChange(event){
        this.salary = event.target.value;
    }
    handleOperatorChange(event){
        this.operator = event.target.value;
    }
}