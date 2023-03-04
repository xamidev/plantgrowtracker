# Hardware I/O imports
from machine import Pin, I2C  
import bme280

# Other imports
from time import sleep
from math import e, log

i2c=I2C(0,sda=Pin(0), scl=Pin(1), freq=400000)   
internalLED = machine.Pin(25,machine.Pin.OUT)
externalLED = machine.Pin(13,machine.Pin.OUT)
internalLED.value(1)

# Blink function for LEDs in circuit
def blink(led):
    led.value(1)
    sleep(0.1)
    led.value(0)

# Main thread loop
while True:
    try:
        # Fetch information from BME280
        bme = bme280.BME280(i2c=i2c)
        blink(externalLED)
        temp = bme.values[0][:-1]
        pressure = bme.values[1]
        humidity = bme.values[2]
        rh = bme.values[2][:-1]
        leaftemp = float(temp)-2.0
        #print(f"Temp: {temp}°C | Pressure: {pressure} | Humidity: {bme.values[2]}")
        
        airSVP = 610.78*e**(float(temp)/(float(temp)+237.3)*17.2694)
        airVPD = airSVP*(1-float(rh)/100)
        
        leafSVP = 610.78*e**(leaftemp/(leaftemp+237.3)*17.2694)
        leafVPD = leafSVP - (airSVP*float(rh)/100)
        
        atrh = log(float(rh)/100) + (17.625*float(temp))/(243.04+float(temp))
        dewPoint = (243.04 * atrh / (17.625 - atrh))
        #print(f"Air VPD: {round(airVPD/1000,3)}kPa | Leaf VPD: {round(leafVPD/1000,3)}kPa | Dew point: {round(dewPoint,2)}°C\n")
        print(f"{temp}°C\n{pressure}\n{bme.values[2]}\n{round(airVPD/1000,3)}kPa\n{round(leafVPD/1000,3)}kPa\n{round(dewPoint,2)}°C\n")
        sleep(1)
    # On thread exit, shut LEDs off
    except (KeyboardInterrupt, SystemExit):
        print("KeyboardInterrupt caught - Ending thread")
        internalLED.value(0)
        externalLED.value(0)
        raise