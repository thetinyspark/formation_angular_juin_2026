TP n°9 

Créez deux fichiers nommés employees.json et salaries.json

le premier contient un tableau d'employés sous cette forme: 

[
    {
        id: <id_employee>,
        name: <name_employee>
    }
]


le deuxième contient un tableau de salaires sous cette forme: 

[
    {
        employeeId: <employee_id>,
        amount: <salary_amount>
    }
]

Le but du TP est de télécharger les deux fichiers et de créer 
une méthode capable de retourner une promesse d'un tableau d'objets 
qui auront la forme suivante: 

[
    {
        id: <id_employee>,
        name: <name_employee>, 
        salary: <salary_employee>
    }
]

