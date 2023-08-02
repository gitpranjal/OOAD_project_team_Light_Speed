from collections import OrderedDict
import pickle

class searchLogic:

    def __init__(self, data, query, case_sensitive, and_check, or_check, not_check):
        self.data = data.data
        self.query = query
        self.case_sensitive = case_sensitive
        self.and_check = and_check
        self.or_check = or_check
        self.not_check = not_check
        
        matches = self.execute_logic(self.query, self.data, self.and_check, self.or_check, self.not_check, case_sensitive=self.case_sensitive)
        self.matches = matches

    def execute_logic(self, query, search_results, and_check, or_check, not_check, case_sensitive=False):
        matches = []
        for i in search_results:
            desc = i["Description"]
            if not case_sensitive:
                desc = desc.lower()
                query = query.lower()

            if and_check:
                if self.and_logic(query, desc):
                    matches.append(i)
            elif not_check:
                if self.not_logic(query, desc):
                    matches.append(i)
            elif or_check:
                if self.or_logic(query, desc):
                    matches.append(i)
            else:
                if query in desc:
                    matches.append(i)
                
        return sorted(matches, key=lambda k: k['Rank'], reverse=True)

    def case_sensitive_true(self, query, desc):
        if query in desc:
            return True
        else:
            return False

    def case_sensitive_false(self, query, desc):
        if query.lower() in desc.lower():
            return True
        else:
            return False

    def or_logic(self, query, desc):
        for i in query.split():
            if i in desc.split():
                return True
        return False

    def and_logic(self, query, desc):
        all_true = []
        for i in query.split():
            if i in desc.split():
                all_true.append(True)
        if len(all_true) == len(query.split()):
            return True
        else:
            return False

    def not_logic(self, query, desc):
        for i in query.split():
            if i in desc.split():
                return False
        return True
