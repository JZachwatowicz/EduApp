#!/bin/sh
find . -name '*.yaml' -exec minikube kubectl -- stop -f {} \;
find . -name '*.yaml' -exec minikube kubectl -- delete -f {} \;
