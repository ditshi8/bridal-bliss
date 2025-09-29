from django.db import models


class Service(models.Model):
    SERVICE_TYPES = [
        ('location', 'Location de robes'),
        ('vente_robes', 'Vente de robes'),
        ('accessoires', 'Accessoires'),
        ('bouquets', 'Bouquets'),
        ('chaussures', 'Chaussures'),
    ]

    nom = models.CharField(max_length=100)
    type_service = models.CharField(max_length=20, choices=SERVICE_TYPES)
    description = models.TextField()
    image = models.ImageField(upload_to='services/')
    prix_depart = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.nom


class Article(models.Model):
    CATEGORIES = [
        ('robe_location', 'Robe de mariée (Location)'),
        ('robe_vente', 'Robe de mariée (Vente)'),
        ('accessoire', 'Accessoire'),
        ('bouquet', 'Bouquet'),
        ('chaussure', 'Chaussure'),
    ]

    nom = models.CharField(max_length=200)
    categorie = models.CharField(max_length=20, choices=CATEGORIES)
    description = models.TextField()
    prix = models.DecimalField(max_digits=10, decimal_places=2)
    image_principale = models.ImageField(upload_to='articles/')
    disponible = models.BooleanField(default=True)
    date_ajout = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nom


class ContactInfo(models.Model):
    nom_boutique = models.CharField(max_length=100, default="BRIDAL BLISS")
    telephone = models.CharField(max_length=20)
    whatsapp = models.CharField(max_length=20)
    email = models.EmailField()
    adresse = models.TextField()
    horaires_ouverture = models.TextField()

    def __str__(self):
        return self.nom_boutique