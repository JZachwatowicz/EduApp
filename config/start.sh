#!/bin/sh
microk8s kubectl create ns eduapp;
sudo find . -name '*.yaml' -exec microk8s kubectl apply -f {} \;
