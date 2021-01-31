import json

from Cython import typeof
from django.shortcuts import get_object_or_404, render
from aquality_server.actions import *
from rest_framework import viewsets
from .serializers import *
from .models import River, User_Account
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from decouple import config
from aquality_server.filter import *
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.core import serializers

# Controlling The View Access To
from .utils.utils import count_score_by_insect


def index(request):
    return render(request, 'aquality_server/index.html', {})


class DataViewSet(viewsets.ModelViewSet):
    queryset = Data.objects.all()
    serializer_class = DataSerializerWithDate
    serializer_class_save = DataSerializer

    def create(self, request):
        if request.method == 'POST':
            saveSerialize = self.serializer_class_save(data=request.data)
            if saveSerialize.is_valid():
                saveSerialize.save()
                return Response(saveSerialize.data, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'Bad request',
            'message': 'Data could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        if (self.request.query_params.get('arduino_id')):
            arduino_id_get = self.request.query_params.get('arduino_id')
            return Data.objects.filter(arduino_id=arduino_id_get).order_by('-date_captured')
        else:
            return Data.objects.all()

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
        except status.HTTP_400_BAD_REQUEST:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)


class RiverViewSet(viewsets.ModelViewSet):
    queryset = River.objects.all().order_by('river_id')
    serializer_class = RiverSerializer

    def get_queryset(self):
        # return River.objects.all().order_by('river_id')
        pnt = getLocationPoint(self.request)
        # return River.objects.filter(location__distance_lt=(pnt,D(m=10000)))
        return getNearbyList(pnt)


class InsectViewSet(viewsets.ModelViewSet):
    queryset = Insect.objects.all().order_by('insect_id')
    serializer_class = InsectSerializer

    def get_queryset(self):
        if (self.request.query_params.get('group')):
            return Insect.objects.filter(insect_group=self.request.query_params.get('group')).order_by('insect_id')
        else:
            return Insect.objects.all().order_by('insect_id')


class AccountUserViewSet(viewsets.ModelViewSet):
    queryset = Login_Account.objects.all().order_by('account_id')
    serializer_class = LoginAccountSerializer

    def create(self, request):
        if request.method == 'POST':
            saveSerialize = self.serializer_class(data=request.data)
            if saveSerialize.is_valid():
                saveSerialize.save()
                return Response(saveSerialize.data, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        return Login_Account.objects.all().order_by('account_id')

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
        except status.HTTP_400_BAD_REQUEST:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)


# def addData(request):
#     returnMessage = saveRiverListToDbFromWFA()
#     return render(request, 'aquality_server/addData.html',{'returnMessage': returnMessage})

@csrf_exempt
def testingPage(request):
    # request_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=River&inputtype=textquery&fields=geometry&key=" + config('GOOGLEMAP_APIKEY')
    # locationfound = requests.get(request_url)
    # data = locationfound.json().get("candidates")[0].get("geometry").get("location")
    return render(request, 'aquality_server/testing.html', {'request': request})


def testingPageForPatrick(request):
    return JsonResponse({
        'status': 'Image Accepted',
        'message': {'image': 'http//......', 'class_label': ['Ecdyonurus'], 'confidence': [0.9999022483825684]}
    })


@csrf_exempt
def checkUser(request):
    username = request.POST['username']
    password = request.POST['password']
    userGet = authenticate(username=username, password=password)
    if userGet is not None:
        user_account = User_Account.objects.filter(user=userGet)[0]
        return JsonResponse({
            'status': 'Login Success',
            'user_username': userGet.username,
            'date_joined': userGet.date_joined,
            'user_first_name': userGet.first_name,
            'user_last_name': userGet.last_name,
            'user_email': userGet.email,
            'user_group': user_account.user_group,
            'user_profic': str(user_account.profile_pic),
            'user_dob': user_account.date_of_birth,
            'user_occupation': user_account.occupation,
            'user_bio': user_account.bio
        })
    else:
        return JsonResponse({
            'status': 'Invalid Login',
            'message': 'Wrong Username Or Password'
        })


@csrf_exempt
def registerPage(request):
    username = request.POST['username']
    email = request.POST['email']
    password = request.POST['password']
    if username is not None and email is not None and password is not None:
        user = User.objects.create_user(username, email, password)
        entry = User_Account.objects.create(user=user)
        return JsonResponse({
            'status': 'Register Success',
            'Message': 'User Created',
            'username': user.username
        })
    else:
        return JsonResponse({
            'status': 'Register Fail',
            'message': 'Field Missing'
        })


@csrf_exempt
def del_user(request):
    try:
        username_get = request.POST['username']
        u = User.objects.get(username=username_get)
        u.delete()
        return JsonResponse({
            'status': 'User with username : ' + username_get + ' Deleted'
        })

    except User.DoesNotExist:
        return JsonResponse({
            'status': 'User with username : ' + username_get + ' Not Found'
        })

    except Exception as e:
        return JsonResponse({
            'status': 'Error Occur',
            'error': str(e)
        })


@csrf_exempt
def if_username_exist(request):
    try:
        username_get = request.POST['username']
        if (username_get is not None):
            u = User.objects.get(username=username_get)
            if u is None:
                return JsonResponse({
                    'status': 'Username Not Exist'
                })
            else:
                return JsonResponse({
                    'status': 'Username Exist'
                })
        else:
            return JsonResponse({
                'status': 'Username not Receive'
            })
    except User.DoesNotExist:
        return JsonResponse({
            'status': 'Username Not Exist'
        })
    except Exception as e:
        return HttpResponse(e)


@csrf_exempt
def if_email_exist(request):
    try:
        email_get = request.POST['email']
        if (email_get is not None):
            u = User.objects.get(email=email_get)
            if u is None:
                return JsonResponse({
                    'status': 'email Not Exist'
                })
            else:
                return JsonResponse({
                    'status': 'email Exist'
                })
        else:
            return JsonResponse({
                'status': 'email not Receive'
            })
    except User.DoesNotExist:
        return JsonResponse({
            'status': 'Email Not Exist'
        })
    except Exception as e:
        return HttpResponse(e)

@csrf_exempt
def calculate_score_insect(request):
    # json_object variable is create and initialized
    json_object = {'success': 404}

    try:
        data = json.loads(request.body)
        # if statement checking if POST request is sent and no other
        if request.method == "POST":
            # if the list section of the POST request is set to None no list is sent, skip
            if not len(data['list']) == 0:
                # set json_object to found as POST request was accepted and url meets criteria
                json_object['success'] = 200
                json_object['data_in_list'] = True
                # set score that is returned
                json_object['object'] = count_score_by_insect(data['list'])
            else:
                json_object['success'] = 200
                json_object['data_in_list'] = False
                json_object['object'] = 'N/A'
        else:
            json_object['data_in_list'] = False
            json_object['object'] = 'N/A'

    except ValueError:
        json_object['json'] = False
        json_object['object'] = 'N/A'
    except KeyError:
        json_object['list'] = False
        json_object['object'] = 'N/A'

    # return json_object and a JSON response
    return JsonResponse(json_object)
