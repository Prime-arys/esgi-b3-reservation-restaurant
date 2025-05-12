# ESGI Projet Final : API Node / Express

## Liste des routes

Pour chaque route, renseigner le niveau d'auth qu'il faut

Les routes sont composées de la manière suivante :

```
http://localhost:3000/api/route
[protocole]://[hote]:[port]/api/[route]
```

Les routes marquées d'un `*` sont protégées par un système d'authentification JWT. Les routes marquées par `**` sont protégées pour les admins par le même système.  
Pour accéder à ces routes, il faut se connecter via la route `/api/users/connect` (authentification par cookie).

### /api/users/connect

-   **POST** : Authentification de l'utilisateur
    -   **Body** :
        ```json
        {
            "email": "0@0.com",
            "password": "1234"
        }
        ```
    -   **Réponse** :
        -   **Status** : 200
            ```json
            {
                "message": "User connected successfully",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJlbWFpbCI6IjBAMC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDcwNjExNzIsImV4cCI6MTc0NzMyMDM3MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIn0.defyTWW8J8cqG9hCvO_3aANdsSqxmvQgzz54F0v2zto",
                "user": {
                    "fname": "0",
                    "lname": "0",
                    "role": "ADMIN"
                }
            }
            ```
        -   **Status** : 401

### /api/users/register

-   **POST** : Inscription d'un utilisateur
    -   **Body** :
        ```json
        {
            "email": "0@0.com",
            "password": "1234",
            "fname": "0",
            "lname": "0",
            "phone": "33 6 10 10 10 10"
        }
        ```
    -   **Réponse** :
        -   **Status** : 201
            ```json
            {
                "message": "User created successfully",
                "user": {
                    "fname": "0",
                    "lname": "0",
                    "role": "ADMIN"
                }
            }
            ```
        -   **Status** : 400
        -   **Status** : 409

### /api/users/disconnect

-   **GET** : Déconnexion de l'utilisateur
    -   **Réponse** :
        -   **Status** : 200

### /api/users/info *

-   **GET** : Récupération des informations de l'utilisateur
    -   **Réponse** :
        -   **Status** : 200
            ```json
            {
                "message": "User info retrieved successfully",
                "user": {
                    "email": "0@0.com",
                    "fname": "0",
                    "lname": "0",
                    "phone": "33 6 10 10 10 10",
                    "role": "ADMIN"
                }
            }
            ```
        -   **Status** : 401

### /api/reservation **

-   **GET** : Récupération de toutes les réservations
    -   **Réponse** :
        -   **Status** : 200
            ```json
            {
                "reservations": [
                    {
                        "user_id": 1,
                        "reservation_id": 1,
                        "number_of_people": 50,
                        "date_": "2025-05-12T22:00:00.000Z",
                        "time_": "17:51:10",
                        "status": "CONFIRMED"
                    }
                ]
            }
            ```
        -   **Status** : 401
        -   **Status** : 500

### /api/my-reservation *

-   **GET** : Récupération de toutes les réservations de l'utilisateur connecté
    -   **Réponse** :
        -   **Status** : 200
            ```json
            {
                "reservations": [
                    {
                        "user_id": 2,
                        "reservation_id": 4,
                        "number_of_people": 2,
                        "date_": "2025-05-22T22:00:00.000Z",
                        "time_": "21:51:10",
                        "status": "PENDING"
                    }
                ]
            }
            ```
        -   **Status** : 401
        -   **Status** : 500

### /api/reservation *

-   **POST** : Création d'une réservation
    -   **Body** :
        ```json
        {
            "name":"John Doe",
            "phone":"33 6 00 00 00 00",
            "number_of_people": 4,
            "date":"2025-05-23",
            "time":"21:51:10",
            "note":"note"
        }
        ```
    - **Réponse** :
        -   **Status** : 200
            ```json
            {
                "message": "Réservation créée avec succès"
            }
            ```
        -   **Status** : 400
        -   **Status** : 401
        -   **Status** : 409

### /api/reservation/:id *

-   **PUT** : Modification d'une réservation
    -   **Body** :
        ```json
        {
            "name":"John Doe",
            "phone":"33 6 00 00 00 00",
            "number_of_people": 4,
            "date":"2025-05-23",
            "time":"21:51:10",
            "note":"note"
        }
        ```
    - **Réponse** :
        -   **Status** : 200
            ```json
            {
                "message": "Réservation mise à jour avec succès"
            }
            ```
        -   **Status** : 400
        -   **Status** : 404

### /api/reservation/:id *

-   **DELETE** : Suppression d'une réservation
    - **Réponse** :
        -   **Status** : 200
            ```json
            {
                "message": "Réservation annulée avec succès"
            }
            ```
        -   **Status** : 400
        -   **Status** : 404

### /api/reservation/:id **

-   **PATCH** : Validation d'une réservation
    - **Réponse** :
        -   **Status** : 200
            ```json
            {
                "message": "Réservation confirmée avec succès"
            }
            ```
        -   **Status** : 400
        -   **Status** : 404

## Exemple de requête JSON

## Méthodes attendues

## Statuts HTTP utilisés
