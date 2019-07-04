import { LightningElement, api } from 'lwc';

export default class JobAdvertisementItem extends LightningElement {
    @api job;

    resetFilters(event){
        var elem = this.template.querySelector('div.test-element').style.display;
        if(elem === 'none'){
            this.template.querySelector('div.test-element').style.display = 'block'
            event.target.iconName = 'utility:chevronup';
        }
        else if( elem === 'block'){
            this.template.querySelector('div.test-element').style.display = 'none';
            event.target.iconName = 'utility:chevrondown';
        }
        console.log(elem);
    }
}