int trigPin=12;
int echoPin=11;
float pingTravelTime;
float cm;


float pingTravelDistance;

void setup() {
pinMode(trigPin,OUTPUT);
pinMode(echoPin,INPUT);
Serial.begin(9600);

}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin,HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  pingTravelTime = float(pulseIn(echoPin, HIGH));
  //speed of sound : 340m/1s
  //34000cm/1000000 microseconds
  //after simplified get 34/1000
  pingTravelDistance = (pingTravelTime * 34)/1000;
  cm = pingTravelDistance/2;
 
  Serial.print("Echo =");
  Serial.print(pingTravelTime);
  Serial.print(" | | Distance = ");
  Serial.print(cm);
  Serial.println("cm");
  delay(100);
}

