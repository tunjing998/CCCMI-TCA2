from django.test import TestCase
from aquality_server.models import Login_Account

# Create your tests here.
class AccountTestCase(TestCase):
    def setUp(self):
        Login_Account.objects.create(
            username="TestUser1",
            email = "TestingUser@email.com",
            password = "123456"
            )
    
    def testAccountPrint(self):
        print(Login_Account.objects.get(username="TestUser1"))
        self.assertEqual(0,0)