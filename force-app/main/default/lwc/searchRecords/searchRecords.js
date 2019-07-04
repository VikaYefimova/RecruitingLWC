import { LightningElement, track, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
import JOB_ADVERTISEMENT from '@salesforce/schema/Job_Advertisement__c';
import SALARY_FIELD from '@salesforce/schema/Job_Advertisement__c.Salary__c';

export default class SearchRecords extends LightningElement {
    @track name;
    @track salary;
    @track operator;
    @track date;
    @track operatorValues = [
        {
            value: '<',
            label: 'before'},
        {
            value: '>',
            label: 'after'
        }
    ];
    //@track mapTest = new Map();

    @wire(CurrentPageReference) pageRef;

    @wire (getObjectInfo, {objectApiName: JOB_ADVERTISEMENT})
    objectInfo;

    @wire (getPicklistValues, {recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: SALARY_FIELD})
    SalaryPicklistValues;
    

    handleNameChange(event){
        this.name = event.target.value;
        this.fireingFilterEvents(this.name, this.salary, this.operator, this.date);
    }
    handleSalaryChange(event){
        this.salary = event.target.value;
        this.fireingFilterEvents(this.name, this.salary, this.operator, this.date);
    }
    handleOperatorChange(event){
        this.operator = event.detail.value;
        this.fireingFilterEvents(this.name, this.salary, this.operator, this.date);
    }
    handleDateChange(event){
        this.date = event.target.value;
        this.fireingFilterEvents(this.name, this.salary, this.operator, this.date);
    }
    resetFilters(event){
        this.name = '';
        this.salary = undefined;
        this.operator = {value: undefined, label: undefined};
        this.date = '';
        this.fireingFilterEvents(this.name, '', '', '');
    }
    fireingFilterEvents( name, salary, operator, date){
        var filter = new Map();
        filter.set('name', name);
        filter.set('salary', salary);
        filter.set('operator', operator);
        filter.set('date', date);
        console.log(this.date);
        console.log(this.operator);
        fireEvent(this.pageRef, 'changeFilter', filter);
    }
}