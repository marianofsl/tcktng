minikube addons enable ingress  
minikube kubectl -- create secret generic jwt-secret --from-literal=jwt=abc  
npm login  
npm version patch  
npm run build  
npm publish  

npm update @tcktng/common

minikube kubectl exec -- -it auth-depl-97b94dd96-4q8rb sh

curl --header "Content-Type: application/json" --request GET https://tcktng.com/api/users/currentuser --cookie "express:sess=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJall3T1RRMU16SmpNMlU0WVdGaE1EQTFaR0l4TURJME55SXNJbVZ0WVdsc0lqb2lkR1Z6ZEVCMFpYTjBNaTVqYjIwaUxDSnBZWFFpT2pFMk1qQXpNek0wTVRGOS50VDhJYnVQcGlYVTctNk5uOUpoMXRyLUt2eVlHM0tUTHJMMGV4WDQtWDIwIn0=" -v --insecure

curl --header "Content-Type: application/json" --request POST --data '{"email": "test@test2.com", "password": "12345"}' https://tcktng.com/api/users/signup -v --insecure

curl --header "Content-Type: application/json" --request POST --data '{"email": "test@test2.com", "password": "12345"}' https://tcktng.com/api/users/signin -v --insecure

minikube kubectl -- port-forward nats-ss-depl-5b4f579c4d-wv48n 4222:4222