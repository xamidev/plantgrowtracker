from machine import I2C, Pin
from ssd1306 import SSD1306_I2C
from time import sleep
import bme280
from bh1750 import BH1750
from mq2 import MQ2

bootLed = machine.Pin(4, machine.Pin.OUT)
bootLed.value(1)

i2c = I2C(0,sda=Pin(16), scl=Pin(17), freq=400000)
i2c_lux = I2C(1,sda=Pin(14), scl=Pin(15), freq=400000)
light = BH1750(i2c_lux)
internalLed = machine.Pin(25, machine.Pin.OUT)
measureLed = machine.Pin(13, machine.Pin.OUT)

pin=26
sensor = MQ2(pinData = pin, baseVoltage = 3.3)
oled = SSD1306_I2C(128,64,i2c)

print("Calibrating")
sensor.calibrate()
print("Calibration completed")
print("Base resistance:{0}".format(sensor._ro))

internalLed.value(1)

while True:
    try:
        bme = bme280.BME280(i2c=i2c)
        temp = bme.values[0][:-1]
        pressure = bme.values[1]
        humidity = bme.values[2]
        lux = round(light.luminance(BH1750.ONCE_HIRES_1))
        gas = sensor.readSmoke()
        
        
        oled.fill(0)
        oled.text(f"T: {temp}C",0,0)
        oled.text(f"H: {humidity}", 0,15)
        oled.text(f"P: {pressure}", 0,30)
        oled.text(f"G: {round(gas,1)} ppm", 0,45)
        oled.text(f"{lux} lux",0,55)
        oled.show()
        measureLed.value(1)
        sleep(0.1)
        measureLed.value(0)
        bootLed.value(0)
        
    except KeyboardInterrupt:
        internalLed.value(0)
        bootLed.value(0)
        measureLed.value(0)
        print("Abort")
        oled.poweroff()
        raise