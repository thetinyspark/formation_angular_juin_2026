TP n°5 

Ajoutez les fonctionnalités suivantes au ProductComponent.ts


- Faire en sorte qu'il y ait deux modes d'affichage, l'un concis, l'autre détaillé. 
- Dans le mode concis, on ne voit que l'image, le nom, le prix du produit, ainsi que le bouton "Add to cart"
- Dans le mode détaillé, on ajoute la description du produit, ainsi que sa plateforme

Ces deux modes, doivent pouvoir être activé via des booleans publics en @Input posés 
sur le ProductComponent 


- Dans le CartService, ajoutez une fonctionnalité nommée "addToCart" qui fait en sorte 
de stocker le produit nouvellement acheté au sein d'un tableau. 

- Concernant la fonctionnalité getCartFromAPI, laissez là intouchée pour l'instant, nous la modifierons après. 