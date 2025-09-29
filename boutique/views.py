from django.shortcuts import render
from .models import Service, Article, ContactInfo


def index(request):
    services = Service.objects.all()[:6]
    articles_populaires = Article.objects.filter(disponible=True)[:8]
    contact_info = ContactInfo.objects.first()

    context = {
        'services': services,
        'articles_populaires': articles_populaires,
        'contact_info': contact_info,
    }
    return render(request, 'boutique/index.html', context)


def services(request):
    services_list = Service.objects.all()
    contact_info = ContactInfo.objects.first()

    context = {
        'services': services_list,
        'contact_info': contact_info,
    }
    return render(request, 'boutique/services.html', context)


def gallery(request):
    articles = Article.objects.filter(disponible=True)
    categories = Article.CATEGORIES
    contact_info = ContactInfo.objects.first()

    # Filtrer par catégorie si spécifié
    categorie_filter = request.GET.get('categorie')
    if categorie_filter:
        articles = articles.filter(categorie=categorie_filter)

    context = {
        'articles': articles,
        'categories': categories,
        'categorie_actuelle': categorie_filter,
        'contact_info': contact_info,
    }
    return render(request, 'boutique/gallery.html', context)


def contact(request):
    contact_info = ContactInfo.objects.first()

    context = {
        'contact_info': contact_info,
    }
    return render(request, 'boutique/contact.html', context)


def about(request):
    contact_info = ContactInfo.objects.first()

    context = {
        'contact_info': contact_info,
    }
    return render(request, 'boutique/about.html', context)