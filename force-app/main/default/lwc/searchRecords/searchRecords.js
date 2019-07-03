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
        var mapTest = new Map();
        mapTest.set('name', this.name);
        mapTest.set('salary', this.salary);
        console.log(mapTest);
        fireEvent(this.pageRef, 'changeFilter', mapTest);
    }
    handleSalaryChange(event){
        this.salary = event.target.value;
        var mapTestt = new Map();
        mapTestt.set('name', this.name);
        mapTestt.set('salary', this.salary);
        console.log(mapTestt);
        fireEvent(this.pageRef, 'changeFilter', mapTestt);
    }
    handleOperatorChange(event){
        this.operator = event.detail.value;
    }
    handleDateChange(event){
        this.date = event.target.value;
    }
    resetFilters(event){
        this.name = '';
        this.salary = undefined;
        this.operator = {value: undefined, label: undefined};
        this.date = '';
        var maping = new Map();
        maping.set('name', this.name);
        maping.set('salary', '');
        console.log('hello in reset ' + maping);
        fireEvent(this.pageRef, 'changeFilter', maping);
    }
}