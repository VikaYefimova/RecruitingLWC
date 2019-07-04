import { LightningElement, track, wire} from 'lwc';
import getJobs from '@salesforce/apex/JobController.getJobs';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class JobAdvertisements extends LightningElement {
    @track jobs;
    @track error;

    @track name = '';
    @track salary = '';
    @track operator = '';
    @track date = '';

    @wire(getJobs, { name: '$name', salary: '$salary', operator: '$operator', publishDate: '$date' }) jobs;

    @wire(CurrentPageReference) pageRef;

    connectedCallback() {console.log('connectedCallback');
        registerListener('changeFilter', this.handleSearchKeyChange.bind(this), this);
    }

    disconnectedCallback() {
        // unsubscribe from searchKeyChange event
        unregisterAllListeners(this);
    }

    handleSearchKeyChange(searchKey) {
        this.name = searchKey.get('name') ? searchKey.get('name') : "";
        this.salary = searchKey.get('salary') ? searchKey.get('salary') : "";
        this.operator = searchKey.get('operator') ? searchKey.get('operator'): "";
        this.date = searchKey.get('date') ? searchKey.get('date'): "";
    }
}