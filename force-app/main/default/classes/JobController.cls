public with sharing class JobController {
    @AuraEnabled(cacheable=true)
    public static List<Job_Advertisement__c> getJobs(String name, String salary){
        String searchName = ' where Name like \'%' + name + '%\'';
        String searchQuery = 'select Name, Id, Education__c, Salary__c, Location__c, Description__c, Skills_Required__c, Status__c, Phone__c, Email__c, Manager_Name__c from Job_Advertisement__c ' + searchName;
        if(salary != ''){
            searchQuery = searchQuery + ' AND Salary__c like \'' + salary + '\'';
        }
        List<Job_Advertisement__c> jobs = Database.query(searchQuery);
        return jobs;
    }
}