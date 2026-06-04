TP n°14 

- Créez un PreloadingService avec un signal<boolean> nommé "isLoading" exposé en propriété
( pas de readonly )

- Créez un composant PreloadingComponent que vous intégrerez en dur sur le AppComponent
et qui, une fois affiché (display:block), informe l'utilisateur que des données 
sont en cours de chargement. Du coup, l'affichage de ce panneau est dépendant de la valeur  du signal "isLoading" contenu dans PreloadingService. 

- Dans le catalogResolver, utilisez ce PreloadingService pour faire en sorte de passer 
isLoading à true, puis, quelques secondes plus tard (pour simuler une latence réseau), passer "isLoading" à false;


