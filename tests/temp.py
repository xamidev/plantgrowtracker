import machine
import utime

sensor_temp = machine.ADC(4)
LED = machine.Pin(25,machine.Pin.OUT)

conversion_factor = 3.3 / (65535)
i = 0
while True:
    LED.value(1)
    i+=1
    reading = sensor_temp.read_u16() * conversion_factor
    temp = 27 - (reading - 0.706)/0.001721
    print(f"Temperature: {temp}°C | Iteration: {i}")
    utime.sleep(1)
    LED.value(0)
    utime.sleep(1)
