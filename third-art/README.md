# Oeuvre basé sur de la Data : Attraction urbaine

## But de l'oeuvre 

Attraction Urbaine a pour but de montrer a quel points les grandes villes sont beaucoup plus attractive ville dans l'environnement socio-économique actuel avec une exode rurale qui est très visible dans les pays européens dont notamment la France.


## Origine de la data

Les données utilisés pour cette oeuvre viennent d'une api gouvernementale Française : [geo.api.gouv.fr](https://geo.api.gouv.fr) qui recense entre autre les informations sur les communes de France, dont la population de ces dites communes.
Exemple d'endpoint de l'api pour le département Ille-et-Vilaine :
`https://geo.api.gouv.fr/communes?codeDepartement=35&fields=nom,population&format=json`


## Transposition de la data dans l'oeuvre

Grace à cette api je récupére les informations sur le nom et la population de la ville.
Avec cela je peux générer une ville qui possédent un champ d'attraction qui est proportionnel aux nombre d'habitant de la ville. 

Les Dummys (nom de la population qui peuple mon oeuvre) sont donc attirés par les villes lorsqu'ils passent dans le champs d'attraction de ces dernières.