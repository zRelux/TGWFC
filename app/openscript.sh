#!/bin/bash
declare -a simulators=("39495D3D-5D0F-4DB2-AF98-1A7C5608E76E" "45B07D73-C604-4242-876D-6EDE6A215B6B" "6196F0E2-BE61-4359-9F70-1A255319E504")

for i in "${simulators[@]}"
do
    xcrun instruments -w $i
    xcrun simctl install $i ~/.expo/ios-simulator-app-cache/Exponent-2.15.3.tar.app
    xcrun simctl openurl $i exp://127.0.0.1:19000      
done