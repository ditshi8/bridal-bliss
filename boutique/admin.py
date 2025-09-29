from django.contrib import admin
from .models import Service, Article, ContactInfo


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['nom', 'type_service', 'prix_depart']
    list_filter = ['type_service']
    search_fields = ['nom', 'description']


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['nom', 'categorie', 'prix', 'disponible', 'date_ajout']
    list_filter = ['categorie', 'disponible', 'date_ajout']
    search_fields = ['nom', 'description']
    list_editable = ['disponible']


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ['nom_boutique', 'telephone', 'email']

    def has_add_permission(self, request):
        # Permettre seulement un seul enregistrement de contact
        return not ContactInfo.objects.exists()