from django.test import TestCase
from aquality_server.models import *
from django.contrib.gis.geos import GEOSGeometry
from django.contrib.gis.measure import D # ``D`` is a shortcut for ``Distance``

# Create your tests here.
class AccountTestCase(TestCase):
    def setUp(self):
        Login_Account.objects.create(
            username="TestUser1",
            email = "TestingUser@email.com",
            password = "123456"
            )
    
    def testAccountPrint(self):
        self.assertEqual(0,0)
        
class RiverTestCase(TestCase):
    def setUp(self):
        River.objects.create(
            river_id= 1,
            river_code= "IE_NW_01S010280",
            river_name= "ST JOHNSTON_010",
            river_catchments_code= "01",
            river_catchments= "Foyle",
            location=Point( -7.5032474,54.9246646),
            local_authority= "Donegal County Council",
            water_body_category= "River",
            protected_area= None,
            transboundary= "No",
            canal= False
        )
        River.objects.create(
            river_id= 2,
            river_code= "IE_NW_01S030200",
            river_name= "SWILLY BURN_010",
            river_catchments_code= "01",
            river_catchments= "Foyle",
            location=  Point(-7.6191557, 54.8741376),
            local_authority= "Donegal County Council",
            water_body_category= "River",
            protected_area= None,
            transboundary= "No",
            canal= False
        )
        
    def testFindNearBy(self):
        pnt = Point(-7.55,54.93)
        result = River.objects.filter(location__distance_lt=(pnt, D(m=5000)))
        expectResult = River.objects.get(river_id = 1)
        if(result.count() == 1):
            self.assertEqual(result[0],expectResult)
        else:
            self.assertFalse(self)