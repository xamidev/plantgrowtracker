import machine
import utime

redLED = machine.Pin(0,machine.Pin.OUT)
yellowLED = machine.Pin(1,machine.Pin.OUT)
greenLED = machine.Pin(2,machine.Pin.OUT)

while True:
    redLED.value(1)
    utime.sleep(0.5)
    yellowLED.value(1)
    utime.sleep(0.5)
    greenLED.value(1)
    utime.sleep(0.5)
    redLED.value(0)
    utime.sleep(0.5)
    yellowLED.value(0)
    utime.sleep(0.5)
    greenLED.value(0)
    utime.sleep(0.5)
