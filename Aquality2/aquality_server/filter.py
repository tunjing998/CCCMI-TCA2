import django_filters
from .models import River

class RiverFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='iexact')

    class Meta:
        model = River
        fields = ['price', 'release_date']
        