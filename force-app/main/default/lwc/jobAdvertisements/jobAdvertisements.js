import { LightningElement, track, wire} from 'lwc';
import getJobs from '@salesforce/apex/JobController.getJobs';
import { registerListener, unregisterAllListeners, fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class JobAdvertisements extends LightningElement {
    @track jobs;
    @track error;

    @track name = '';
    @track salary = '';
    @track operator = '';
    @track date = '';
    @track selectedjobsitems = [];

    @wire(getJobs, { name: '$name', salary: '$salary', operator: '$operator', publishDate: '$date' }) jobs;

    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        registerListener('changeFilter', this.handleSearchKeyChange.bind(this), this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleSearchKeyChange(searchKey) {
        this.name = searchKey.get('name') ? searchKey.get('name') : "";
        this.salary = searchKey.get('salary') ? searchKey.get('salary') : "";
        this.operator = searchKey.get('operator') ? searchKey.get('operator'): "";
        this.date = searchKey.get('date') ? searchKey.get('date'): "";
    }
    selectJobHandler(event){
        var jobItem = event.detail;
        this.selectedjobsitems.push(jobItem);
        fireEvent(this.pageRef, 'selectJobItem', this.selectedjobsitems);
    }
}