/* eslint-disable vars-on-top */
import { LightningElement, api, track } from 'lwc';

export default class JobAdvertisementItem extends LightningElement {
    @api job;
    @api selectedjobs = [];
    @track selectFlag = false;
    
    renderedCallback(){
        for(var i=0; i<this.selectedjobs.length; i++){
            if(this.job.Id === this.selectedjobs[i].Id){
                this.selectFlag = true;
            }
        }
    }
    openDetail(event){
        var elem = this.template.querySelector('div.test-element').style.display;
        if(elem === 'none'){
            this.template.querySelector('div.test-element').style.display = 'block'
            event.target.iconName = 'utility:chevronup';
        }
        else if( elem === 'block'){
            this.template.querySelector('div.test-element').style.display = 'none';
            event.target.iconName = 'utility:chevrondown';
        }
    }
    selectItem(event){
        var selectedJobIndex = null;
        const selectJobEvent = new CustomEvent('selectjobitem', { detail: this.job });
        if(event.target.label === 'Select'){
            event.target.label = 'Deselect';
            
        }
        else{
            for(var i = 0; i<this.selectedJobs.length; i++){
                if(this.selectedJobs[i].Id === this.job.Id){
                    selectedJobIndex = i;
                }
            }
            this.selectedJobs.splice(selectedJobIndex, 1);
            event.target.label = 'Select';
        }
        this.dispatchEvent(selectJobEvent);
    }
}