from collections import OrderedDict

import pickle

#from requests import request

"""
function caseSensitiveMatching(query, caseSensitive){

    const matches = [];
    const lookForMe = query;
    if (caseSensitive == true){
        // loop over rows of the data structure, indexing for desc// need to figure out how to loop over to uncomment
        // if (exactMatch(rowDescription, lookForMe)){ // need to initialize rowDescprition to uncomment
            // matches.append(rowIndex) // need to figure out how to access rowIndex to uncomment
        // }
    } else{
        // loop over rows of data structure indexing for desc // need to figure out how to loop over to uncomment
        // if (exactMatch(rowDescription.toLowerCase(), lookForMe.toLowerCase()))){
            // matches.append(rowIndex)
        // }
    }
    return matches
}

function exactMatch(rowDesc, lookForMe){
    return rowDesc.includes(lookForMe));
}

"""
class searchLogic:

    def __init__(self, data, query, case, anda, ora, nota):
        self.data = data.data
        self.query = query
        if case == "True":
            self.case = True
        else:
            self.case = False
        
        if anda == "True":
            self.anda = True
        else:
            self.anda = False
        
        if ora == "True":
            self.ora = True
        else:
            self.ora = False
        
        if nota == "True":
            self.nota = True
        else:
            self.nota = False
        
        matches = self.logic(self.query, self.data, self.anda, self.ora, self.nota, caseSensitive=self.case)
        self.matches = matches

    def logic(self, query, searchResults, anda, ora, nota, caseSensitive = False):
        matches = []
        for i in searchResults:
            desc = i["Description"]
            if not caseSensitive:
                desc = desc.lower()
                query = query.lower()

            if anda == True:
                if self.andLogic(query, desc):
                    matches.append(i)
            elif nota == True:
                if self.notLogic(query, desc):
                    matches.append(i)
            elif ora == True:
                if self.orLogic(query, desc):
                    matches.append(i)
            else:
                if query in desc:
                    matches.append(i)
                
        return sorted(matches,key=lambda k: k['Rank'],reverse=True)


    
    def caseSensitiveTrue(self, query, desc):
        if query in desc:
            return True
        else:
            return False
    
    def caseSensitiveFalse(self, query, desc):
        if query.lower() in desc.lower():
            return True
        else:
            return False
    
    def orLogic(self, query, desc):
        for i in query.split():
            if i in desc.split():
                return True
        return False
    
    def andLogic(self, query, desc):
        allTrue = []
        for i in query.split():
            if i in desc.split():
                allTrue.append(True)
        if len(allTrue) == len(query.split()):
            return True
        else:
            return False
    
    def notLogic(self, query, desc):
        for i in query.split():
            if i in desc.split():
                return False
        return True