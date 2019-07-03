import { LightningElement, track, wire} from 'lwc';
import getJobs from '@salesforce/apex/JobController.getJobs';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class JobAdvertisements extends LightningElement {
    @track jobs;
    @track error;

    @track name = '';
    @track salary = '';

    @wire(getJobs, { name: '$name', salary: '$salary'}) jobs;

    @wire(CurrentPageReference) pageRef;

    connectedCallback() {console.log('connectedCallback');
        // subscribe to searchKeyChange event
        this.name = '1';
        registerListener('changeFilter', this.handleSearchKeyChange.bind(this), this);
    }

    disconnectedCallback() {
        // unsubscribe from searchKeyChange event
        unregisterAllListeners(this);
    }

    handleSearchKeyChange(searchKey) {
        this.name = searchKey.get('name') ? searchKey.get('name') : "";
        this.salary = searchKey.get('salary') ? searchKey.get('salary') : "";
        console.log('test event handler ' + searchKey.get('salary'));
    }

}