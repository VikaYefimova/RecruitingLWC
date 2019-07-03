import { LightningElement, track, wire} from 'lwc';
import getJobs from '@salesforce/apex/JobController.getJobs';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class JobAdvertisements extends LightningElement {
    @track jobs;
    @track error;

    @track name;

    @wire(getJobs) jobs;

    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        // subscribe to searchKeyChange event
        registerListener('changeFilter', this.handleSearchKeyChange, this);
    }

    disconnectedCallback() {
        // unsubscribe from searchKeyChange event
        unregisterAllListeners(this);
    }

    handleSearchKeyChange(searchKey) {
        this.name = searchKey;
        console.log('test event handler');
    }

}