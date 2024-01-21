#!/bin/sh
minikube kubectl -- create ns eduapp
find . -name '*.yaml' -exec minikube kubectl -- apply -f {} \;
