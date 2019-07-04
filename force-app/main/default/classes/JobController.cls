public with sharing class JobController {
    public static String mainPartSearchQuery = 'select Name, Salary__c, Manager_Name__c, Phone__c, Status__c, Location__c, Description__c, Email__c, Education__c, Skills_Required__c from Job_Advertisement__c';
    public String searchQueryFinishPart = ' LIMIT :rec OFFSET :OffsetSize';
    public static string searchQuery = '';
    public static string allSearchQuery ='';
    
    @AuraEnabled(cacheable=true)
    public static List<Job_Advertisement__c> getJobs(String name, String salary, String operator, String publishDate){
        searchQuery = '';
        if(!String.isEmpty(name) || (!String.isEmpty(publishDate) && !String.isEmpty(operator)) || !String.isEmpty(salary)){
            searchQuery = searchByName(searchQuery, name);
            searchQuery = searchByPublishedDate(searchQuery, operator, publishDate);
            searchQuery = searchBySalaryRange(searchQuery, salary);
        }
        allSearchQuery = mainPartSearchQuery + searchQuery;
        List<Job_Advertisement__c> jobs = Database.query(allSearchQuery);
        return jobs;
    }
    public static String searchByName(String searchQuery, String nameOfTheVacancy){
        if(!String.isEmpty(nameOfTheVacancy)){
            if(searchQuery!=''){
            	searchQuery += ' AND ';
            }
            else{
                searchQuery +=' where ';
            }
            searchQuery= searchQuery + 'Name LIKE \'%'+nameOfTheVacancy+'%\'';
        }
        return searchQuery;
    }
    public static String searchByPublishedDate(String searchQuery, String operator, String publishDate){
        if(!String.isEmpty(publishDate) && operator != null){
            if(searchQuery!=''){
            	searchQuery += ' AND ';
            }
            else{
                searchQuery +=' where ';
            }
            if(operator == '<'){
                searchQuery= searchQuery + 'DAY_ONLY(CreatedDate) <= ' + publishDate;
            }
            else if(operator == '>'){
                searchQuery= searchQuery + 'DAY_ONLY(CreatedDate) >= ' + publishDate;
            }
        }
        return searchQuery;
    }
    public static String searchBySalaryRange(String searchQuery, String salaryRange){
        if(!String.isEmpty(salaryRange)){
            if(searchQuery!=''){
            	searchQuery += ' AND ';
            }
            else{
                searchQuery +=' where ';
            }
            searchQuery= searchQuery + 'Salary__c LIKE \'' + salaryRange +'\'';
        }
        return searchQuery;
    }
}