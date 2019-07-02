import { LightningElement, track, wire} from 'lwc';
import getJobs from '@salesforce/apex/JobController.getJobs'

export default class JobAdvertisements extends LightningElement {
    @track jobs;
    @track error;

    @wire(getJobs) jobs;

}