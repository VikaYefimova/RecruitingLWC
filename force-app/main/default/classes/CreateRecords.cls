public with sharing class CreateRecords {
    public static void createTestRecord(Integer count, String status) {
        List<Job_advertisement__c> jobs = new List<Job_Advertisement__c>();
        for(Integer i=0; i<count; i++){
            Job_Advertisement__c job = new Job_advertisement__c();
            job.Name = status + 'Job ' + i;
            job.Status__c = status;
            job.Description__c = status + 'job' + i + 'description';
            job.Location__c = status + ' job' + i + 'location';
            job.Education__c = status + ' job' + i + 'education';
            job.Salary__c = '50K - 75K';
            job.Manager_Name__c = 'Viktoriia Yefimova';
            job.Phone__c = '06685978122';
            job.Email__c = 'vikaephimova1996@gmail.com';
            job.Skills_Required__c = status + 'job' + i + 'skills required';
            jobs.add(job);
        }
        insert jobs;
    }
}