public with sharing class JobController {
    @AuraEnabled(cacheable=true)
    public static List<Job_Advertisement__c> getJobs(){
        List<Job_Advertisement__c> jobs = [select Name, Id, Education__c, Location__c, Description__c, Salary__c, Skills_Required__c, Status__c, Phone__c, Email__c, Manager_Name__c from Job_Advertisement__c];
        return jobs;
    }
}