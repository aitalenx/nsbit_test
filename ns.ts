/*
R
modified from liusen
load dependency
"cbit": "file:../pxt-cbit"
*/



//% color="#5984c7" weight=25 icon="\uf1d4"
namespace NSbit_显示类
{
    const PCA9685_ADD = 0x40
    const MODE1 = 0x00
    const MODE2 = 0x01
    const SUBADR1 = 0x02
    const SUBADR2 = 0x03
    const SUBADR3 = 0x04

    const LED0_ON_L = 0x06
    const LED0_ON_H = 0x07
    const LED0_OFF_L = 0x08
    const LED0_OFF_H = 0x09

    const ALL_LED_ON_L = 0xFA
    const ALL_LED_ON_H = 0xFB
    const ALL_LED_OFF_L = 0xFC
    const ALL_LED_OFF_H = 0xFD

    const PRESCALE = 0xFE

    let initialized = false
    export enum enColor
    {
        //% blockId="OFF" block="灭"
        OFF = 0,
        //% blockId="Red" block="红色"
        Red,
        //% blockId="Green" block="绿色"
        Green,
        //% blockId="Blue" block="蓝色"
        Blue,
        //% blockId="White" block="白色"
        White,
        //% blockId="Cyan" block="青色"
        Cyan,
        //% blockId="Pinkish" block="品红"
        Pinkish,
        //% blockId="Green" block="黄色"
        Yellow,
    }
    export enum enLED1
    {    
        //% blockId="OFF" block="灭"
        OFF = 0,
        //% blockId="ON" block="亮"
        ON =1
    }

    //% blockId=cbit_RGB_Car_Big2 block="板载RGB灯|选择颜色 %value"
    //% weight=101
    //% blockGap=10
    //% color="#5984c7"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Big2(value: enColor): void
    {
        switch (value)
        {
            case enColor.OFF:
            {
                setPwm(11, 0, 0);
                setPwm(10, 0, 0);
                setPwm(9, 0, 0);
                break;
            }
            case enColor.Red:
            {
                setPwm(11, 0, 4095);
                setPwm(10, 0, 0);
                setPwm(9, 0, 0);
                break;
            }
            case enColor.Green:
            {
                setPwm(11, 0, 0);
                setPwm(10, 0, 4095);
                setPwm(9, 0, 0);
                break;
            }
            case enColor.Blue:
            {
                setPwm(11, 0, 0);
                setPwm(10, 0, 0);
                setPwm(9, 0, 4095);
                break;
            }
            case enColor.White:
            {
                setPwm(11, 0, 4095);
                setPwm(10, 0, 4095);
                setPwm(9, 0, 4095);
                break;
            }
            case enColor.Cyan:
            {
                setPwm(11, 0, 0);
                setPwm(10, 0, 4095);
                setPwm(9, 0, 4095);
                break;
            }
            case enColor.Pinkish:
            {
                setPwm(11, 0, 4095);
                setPwm(10, 0, 0);
                setPwm(9, 0, 4095);
                break;
            }
            case enColor.Yellow:
            {
                setPwm(11, 0, 4095);
                setPwm(10, 0, 4095);
                setPwm(9, 0, 0);
                break;
            }
        }
    }

    //% blockId=cbit_RGB_Car_Big block="板载RGB灯|红色 %value1|绿色 %value2|蓝色 %value3"
    //% weight=100
    //% blockGap=10
    //% color="#5984c7"
    //% value1.min=0 value1.max=255 value2.min=0 value2.max=255 value3.min=0 value3.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Big(value1: number, value2: number, value3: number): void
    {
        let R = value1 * 16;
        let G = value2 * 16;
        let B = value3 * 16;

        if (R > 4096)
            R = 4095;
        if (G > 4096)
            G = 4095;
        if (B > 4096)
            B = 4095;

        setPwm(11, 0, R);
        setPwm(10, 0, G);
        setPwm(9, 0, B);
    }

    //% blockId=cbit_RGB block="RGB灯|引脚R %pin1|引脚G %pin2|引脚B %pin3|红色 %value1|绿色 %value2|蓝色 %value3"
    //% weight=2
    //% blockGap=8
    //% color="#5984c7"
    //% value1.min=0 value1.max=255 value2.min=0 value2.max=255 value3.min=0 value3.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB(pin1: AnalogPin, pin2: AnalogPin, pin3: AnalogPin, value1: number, value2: number, value3: number): void
    {
        pins.analogWritePin(pin1, value1 * 1024 / 256);
        pins.analogWritePin(pin2, value2 * 1024 / 256);
        pins.analogWritePin(pin3, value3 * 1024 / 256);
    }

    //% blockId=cbit_RGB2 block="RGB灯|引脚R %pin1|引脚G %pin2|引脚B %pin3|显示 %value"
    //% weight=1
    //% blockGap=8
    //% color="#5984c7"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB2(pin1: DigitalPin, pin2: DigitalPin, pin3: DigitalPin, value: enColor): void
    {
        switch (value)
        {
            case enColor.OFF:
            {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 0);
                break;
            }
            case enColor.Red:
            {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 0);
                break;
            }
            case enColor.Green:
            {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 0);
                break;
            }
            case enColor.Blue:
            {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.White:
            {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.Cyan:
            {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.Pinkish:
            {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.Yellow:
            {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 0);
                break;
            }
        }
    }

    // //% blockId=cbit_LED1 block="LED灯|引脚 %pin|状态 %value"
    // //% weight=5
    // //% blockGap=8
    // //% color="#5984c7"
    // //% name.fieldEditor="gridpicker" name.fieldOptions.columns=1
    // export function LED1(pin: DigitalPin, value: enLED1): void
    // {
    //     pins.digitalWritePin(pin, value);
    // }

    // //% blockId=cbit_LED2 block="LED灯|引脚 %pin|亮度 %value"
    // //% weight=4
    // //% blockGap=8
    // //% color="#5984c7"
    // //% value.min=0 value.max=255
    // //% name.fieldEditor="gridpicker" name.fieldOptions.columns=2
    // export function LED2(pin: AnalogPin, value: number): void
    // {
    //     pins.analogWritePin(pin, value * 1024 / 256);
    // }

    // //% blockId=cbit_BreathLED block="LED灯|引脚 %pin"
    // //% weight=3
    // //% blockGap=8
    // //% color="#5984c7"
    // //% name.fieldEditor="gridpicker" name.fieldOptions.columns=3
    // export function BreathLED(pin: AnalogPin): void
    // {
    //     for (let i: number = 0; i < 1023; i++)
    //     {
    //         pins.analogWritePin(pin, i);
    //         //basic.pause(1);
    //         control.waitMicros(1000);
    //     }
    //     basic.pause(10);
    //     for (let i: number = 1023; i > 0; i--)
    //     {
    //         pins.analogWritePin(pin, i);
    //         //basic.pause(1);
    //         control.waitMicros(1000);
    //     }
    // }

    function i2cwrite(addr: number, reg: number, value: number)
    {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }
    function i2cread(addr: number, reg: number)
    {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }
    function setFreq(freq: number): void
    {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        let oldmode = i2cread(PCA9685_ADD, MODE1);
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        i2cwrite(PCA9685_ADD, MODE1, newmode); // go to sleep
        i2cwrite(PCA9685_ADD, PRESCALE, prescale); // set the prescaler
        i2cwrite(PCA9685_ADD, MODE1, oldmode);
        control.waitMicros(5000);
        i2cwrite(PCA9685_ADD, MODE1, oldmode | 0xa1);
    }
    function initPCA9685(): void
    {
        i2cwrite(PCA9685_ADD, MODE1, 0x00)
        setFreq(50);
        initialized = true
    }
    function setPwm(channel: number, on: number, off: number): void
    {
        if (channel < 0 || channel > 15)
            return;
        if (!initialized)
        {
            initPCA9685();
        }
        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADD, buf);
    }
    
    let COMMAND_I2C_ADDRESS = 0x24
    let DISPLAY_I2C_ADDRESS = 0x34
    let _SEG = [0x3F, 0x06, 0x5B, 0x4F, 0x66, 0x6D, 0x7D, 0x07, 0x7F, 0x6F, 0x77, 0x7C, 0x39, 0x5E, 0x79, 0x71];

    let _intensity = 3
    let dbuf = [0, 0, 0, 0]

    function cmd(c: number)
    {
        pins.i2cWriteNumber(COMMAND_I2C_ADDRESS, c, NumberFormat.Int8BE)
    }
    function dat(bit: number, d: number)
    {
        pins.i2cWriteNumber(DISPLAY_I2C_ADDRESS + (bit % 4), d, NumberFormat.Int8BE)
    }

    //% blockId="TM650_ON" block="数码管 打开显示"
    //% weight=50 blockGap=8
    export function on()
    {
        cmd(_intensity * 16 + 1)
    }

    //% blockId="TM650_OFF" block="数码管 关闭显示"
    //% weight=50 blockGap=8
    export function off()
    {
        _intensity = 0
        cmd(0)
    }

    //% blockId="TM650_CLEAR" block="数码管 清空显示"
    //% weight=40 blockGap=8
    export function clear()
    {
        dat(0, 0)
        dat(1, 0)
        dat(2, 0)
        dat(3, 0)
        dbuf = [0, 0, 0, 0]
    }

    //% blockId="TM650_DIGIT" block="数码管 显示数字 %num|在第 %bit位"
    //% weight=80 blockGap=8
    //% num.max=9 num.min=0
    //% bit.max=3 bit.min=0
    export function digit(num: number, bit: number)
    {
        dbuf[bit % 4] = _SEG[num % 16]
        dat(bit, _SEG[num % 16])
    }

    //% blockId="TM650_SHOW_NUMBER" block="数码管 显示数字 %num"
    //% weight=100 blockGap=8
    //% num.max=9999 num.min=0
    export function showNumber(num: number)
    {
        if (num < 0)
        {
            dat(0, 0x40) // '-'
            num = -num
        }
        else
            digit(Math.idiv(num, 1000) % 10, 0)
        digit(num % 10, 3)
        digit(Math.idiv(num, 10) % 10, 2)
        digit(Math.idiv(num, 100) % 10, 1)
    }

    // //% blockId="TM650_SHOW_HEX_NUMBER" block="数码管显示16进制数字 %num"
    // //% weight=90 blockGap=8
    // export function showHex(num: number) {
    //     if (num < 0) {
    //         dat(0, 0x40) // '-'
    //         num = -num
    //     }
    //     else
    //         digit((num >> 12) % 16, 0)
    //     digit(num % 16, 3)
    //     digit((num >> 4) % 16, 2)
    //     digit((num >> 8) % 16, 1)
    // }
    // //% blockId="TM650_SHOW_DP" block="数码管显示小数点 %bit|是否显示 %num"
    // //% weight=80 blockGap=8
    // export function showDpAt(bit: number, show: boolean) {
    //     if (show) dat(bit, dbuf[bit % 4] | 0x80)
    //     else dat(bit, dbuf[bit % 4] & 0x7F)
    // }
    // //% blockId="TM650_INTENSITY" block="数码管设置显示强度 %dat"
    // //% weight=70 blockGap=8
    // export function setIntensity(dat: number) {
    //     if ((dat < 0) || (dat > 8))
    //         return;
    //     if (dat == 0)
    //         off()
    //     else {
    //         _intensity = dat
    //         cmd((dat << 4) | 0x01)
    //     }
    // }

    on();
}
/*****************************************************************************************************************************************
 *  传感器类 ***************************************************************************************************************************** 
 ****************************************************************************************************************************************/

//% color="#c89314" weight=24 icon="\uf1b6"
namespace NSbit_传感器类
{
    export enum enVoice
    {
        //% blockId="Voice" block="有声音"
        Voice = 0,
        //% blockId="NoVoice" block="无声音"
        NoVoice = 1
    }
    export enum enFlame
    {
        //% blockId="Flame" block="有火焰"
        Flame = 0,
        //% blockId="NoVFlame" block="无火焰"
        NoFlame = 1
    }
    export enum enIR
    {
        //% blockId="Get" block="检测到"
        Get = 0,
        //% blockId="NoVoice" block="未检测"
        NoGet = 1
    }
    
    // //% blockId=cbit_Voice_Sensor block="声音传感器|引脚 %pin|返回 %value"
    // //% weight=100
    // //% blockGap=10
    // //% color="#c89314"
    // //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    // export function Voice_Sensor(pin: DigitalPin, value: enVoice): boolean {

    //     pins.setPull(pin, PinPullMode.PullUp);
    //     if (pins.digitalReadPin(pin) == value) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }

    // }

    //% blockId=cbit_Flame_Sensor block="火焰传感器|引脚 %pin|返回 %value"
    //% weight=100
    //% blockGap=10
    //% color="#c89314"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Flame_Sensor(pin: DigitalPin, value: enFlame): boolean
    {
        pins.setPull(pin, PinPullMode.PullUp);
        if (pins.digitalReadPin(pin) == value)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function IR_send_38k()
    {
        for (let i: number = 0; i < 8; i++)
        {
            pins.digitalWritePin(DigitalPin.P9, 1);
            control.waitMicros(13);
            pins.digitalWritePin(DigitalPin.P9, 0);
            control.waitMicros(13);
        }
    }
    // //% blockId=cbit_IR_Sensor block="红外传感器|引脚 %pin|  |%value|障碍物"
    // //% weight=100
    // //% blockGap=10
    // //% color="#c89314"
    // //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    // export function IR_Sensor(pin: DigitalPin, value: enIR): boolean {

    //     pins.setPull(pin, PinPullMode.PullUp);
    //     //IR_send_38k();
    //     if (pins.digitalReadPin(pin) == value) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }

    // }

    // //% blockId=cbit_IR_Send block="红外发射|引脚 %pin"
    // //% weight=100
    // //% blockGap=10
    // //% color="#c89314"
    // //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    // export function IR_Send(pin: DigitalPin): void {

        
    //     IR_send_38k();

    // }
   
    //% blockId=cbit_ultrasonic block="超声波传感器|Trig引脚 %Trig|Echo引脚 %Echo"
    //% color="#c89314"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonic(Trig: DigitalPin, Echo: DigitalPin): number
    {
        // send pulse
        pins.setPull(Trig, PinPullMode.PullNone);
        pins.digitalWritePin(Trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(Trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(Trig, 0);

        // read pulse
        let d = pins.pulseIn(Echo, PulseValue.High, 23200);
        return d / 58;
    }
    //% blockId=cbit_ldr block="光敏|Trig管脚 %Trig"
    //% color="#c89314"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4

    let ldr_pin = AnalogPin.P0//光敏信号引脚
    let ldr_adc = 0;          //光敏ADC值

    //% blockId=LDR_setPin
    //% block="光敏传感器 引脚 |%pinarg|"
    //% weight = 85
    export function setLDRPin(pin_arg: AnalogPin): void
    {
        ldr_pin = pin_arg;
    }
    //% blockId=LDR_getADCValue
    //% block="获取光敏值"
    //% weight = 75
    export function getLDRADCValue(): number
    {
        ldr_adc = pins.analogReadPin(ldr_pin);
        return ldr_adc;
    }

    let sound_pin = AnalogPin.P0//声音信号引脚
    let sound_adc = 0;          //声音信号ADC值

    //% blockId=Sound_setPin
    //% block="声音传感器 引脚 |%pinarg|"
    //% weight = 85
    export function setSoundPin(pin_arg: AnalogPin): void
    {
        sound_pin = pin_arg;
    }

    //% blockId=Sound_getADCValue
    //% block="获取声音值"
    //% weight = 75
    export function getSoundADCValue(): number
    {
        sound_adc = pins.analogReadPin(sound_pin);
        return sound_adc;
    }

    // export enum enRocker
    // {
    //     //% blockId="Nostate" block="无"
    //     Nostate = 0,
    //     //% blockId="Up" block="上"
    //     Up,
    //     //% blockId="Down" block="下"
    //     Down,
    //     //% blockId="Left" block="左"
    //     Left,
    //     //% blockId="Right" block="右"
    //     Right,
    //     //% blockId="Press" block="按下"
    //     Press
    // }

    // export enum enTouch
    // {
    //     //% blockId="NoTouch" block="未触摸"
    //     NoTouch = 0,
    //     //% blockId="Touch" block="触摸"
    //     Touch = 1
    // }
    // export enum enButton
    // {
    //     //% blockId="Press" block="按下"
    //     Press = 0,
    //     //% blockId="Realse" block="松开"
    //     Realse = 1
    // }

    // //% blockId=cbit_TouchPad block="触摸开关|引脚 %pin|返回 %value"
    // //% weight=100
    // //% blockGap=10
    // //% color="#c89314"
    // //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    // export function TouchPad(pin: DigitalPin, value: enTouch): boolean {

    //     pins.setPull(pin, PinPullMode.PullUp);
    //     if (pins.digitalReadPin(pin) == value) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }

    // }
    // //% blockId=cbit_Rocker block="遥杆|VRX %pin1|VRY %pin2|SW %pin3|返回 %value"
    // //% weight=100
    // //% blockGap=10
    // //% color="#c89314"
    // //% name.fieldEditor="gridpicker" name.fieldOptions.columns=6
    // export function Rocker(pin1: AnalogPin, pin2: AnalogPin, pin3: AnalogPin, value: enRocker): boolean {

    //     //pins.setPull(pin3, PinPullMode.PullUp);
    //     let x = pins.analogReadPin(pin1);
    //     let y = pins.analogReadPin(pin2);
    //     let z = pins.analogReadPin(pin3);
    //     let now_state = enRocker.Nostate;

    //     if (x <= 20) // 上
    //     {

    //         now_state = enRocker.Up;

    //     }
    //     if (x >= 1000) //
    //     {

    //         now_state = enRocker.Down;
    //     }
    //     if (y <= 50) //右
    //     {
    //         now_state = enRocker.Right;
    //     }
    //     if (y >= 1000) //左
    //     {
    //         now_state = enRocker.Left;
    //     }
    //     if (z <= 20)
    //         now_state = enRocker.Press;
        
    //     if (now_state == value)
    //         return true;
    //     else
    //         return false;

    // }

    // //% blockId=cbit_Button block="按键|引脚 %pin|返回 %value"
    // //% weight=100
    // //% blockGap=10
    // //% color="#c89314"
    // //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    // export function Button(pin: DigitalPin, value: enButton): boolean {

    //     pins.setPull(pin, PinPullMode.PullUp);
    //     if (pins.digitalReadPin(pin) == value) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }

    // } 

    let dht11_pin = DigitalPin.P0;//温湿度传感器信号引脚
    let DTH11value = 0;           //温湿度传感器值

    function signal_dht11(pin: DigitalPin): void
    {
        pins.digitalWritePin(pin, 0)
        basic.pause(18)
        let i = pins.digitalReadPin(pin)
        pins.setPull(pin, PinPullMode.PullUp);
    }

    // /**
    //  * Set pin at which the DHT data line is connected
    //  * @param pin_arg pin at which the DHT data line is connected
    //  */
    //% block="温湿度传感器 引脚 %pinarg"
    //% blockId=dht11_set_pin
    export function set_pin(pin_arg: DigitalPin): void
    {
        dht11_pin = pin_arg;
    }

    function dht11_read(): number
    {
        signal_dht11(dht11_pin);

        // Wait for response header to finish
        while (pins.digitalReadPin(dht11_pin) == 1);
        while (pins.digitalReadPin(dht11_pin) == 0);
        while (pins.digitalReadPin(dht11_pin) == 1);

        let value = 0;
        let counter = 0;

        for (let i = 0; i <= 32 - 1; i++)
        {
            while (pins.digitalReadPin(dht11_pin) == 0);
            counter = 0
            while (pins.digitalReadPin(dht11_pin) == 1)
            {
                counter += 1;
            }
            if (counter > 4)
            {
                value = value + (1 << (31 - i));
            }
        }
        return value;
    }

    // /**
    //  * Executes reading from sensor - both Temperature & Humidity
    //  * to retrieve static values -> get temperature() or humidity() 
    //  */
    //% block="温湿度传感器 读取温湿度值"
    //% blockId=dht11_read_from_sensor
    export function ReadFromSensor()
    {
        DTH11value=dht11_read();
    }

    // /**
    //  * Returns previously read temperature()
    //  * Do not forget to call ReadFromSensor() to get current ones 
    //  */
    //% block="温度值"
    export function temperature(): number
    {
        return (DTH11value & 0x0000ff00) >> 8;
    }

    // /**
    //  * Returns previously read humidity()
    //  * Do not forget to call ReadFromSensor() to get current ones 
    //  */
    //% block="湿度值"
    export function humidity(): number
    {
        return DTH11value >> 24
    }

    // export enum PingUnit
    // {
    //     //% block="厘米"
    //     Centimeters,
    //     //% block="英寸"
    //     Inches,
    //     //% block="毫秒"
    //     MicroSeconds
    // }

    // export enum LEDType
    // {
    //     //% block="cathode"
    //     cathode,
    //     //% block="anode"
    //     anode
    // }

    // //% blockId=sensor_ping block="超声波传感器 Trig %trig|Echo %echo|获取距离 %unit"
    // //% trig.fieldEditor="gridpicker" trig.fieldOptions.columns=4
    // //% trig.fieldOptions.tooltips="false" trig.fieldOptions.width="300"
    // //% echo.fieldEditor="gridpicker" echo.fieldOptions.columns=4
    // //% echo.fieldOptions.tooltips="false" echo.fieldOptions.width="300"
    // export function sensor_ping(trig: DigitalPin, echo: DigitalPin, unit: PingUnit, maxCmDistance = 500): number {
    //     // send pulse
    //     pins.setPull(trig, PinPullMode.PullNone);
    //     pins.digitalWritePin(trig, 0);
    //     control.waitMicros(2);
    //     pins.digitalWritePin(trig, 1);
    //     control.waitMicros(10);
    //     pins.digitalWritePin(trig, 0);

    //     // read pulse
    //     const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 43);

    //     switch (unit) {
    //         case PingUnit.Centimeters: return d / 43;
    //         case PingUnit.Inches: return d / 110;
    //         default: return d;
    //     }
    // }
	
    
    









  


}
/*****************************************************************************************************************************************
 *    音乐类 *****************************************************************************************************************************
 ****************************************************************************************************************************************/

//% color="#14a8c8" weight=22 icon="\uf001"
namespace NSbit_音乐类
{
    //有源蜂鸣器取值
    export enum enBuzzer
    {
        //% blockId="NoBeep" block="不响"
        NoBeep = 0,
        //% blockId="Beep" block="响"
        Beep
    }
    //音乐取值
    export enum enMusic
    {
        dadadum = 0,
        entertainer,
        prelude,
        ode,
        nyan,
        ringtone,
        funk,
        blues,
        birthday,
        wedding,
        funereal,
        punchline,
        baddy,
        chase,
        ba_ding,
        wawawawaa,
        jump_up,
        jump_down,
        power_up,
        power_down
    }
    //% blockId=cbit_Buzzer block="有源蜂鸣器|引脚 %pin|值 %value"
    //% weight=100
    //% blockGap=10 
    //% color="#14a8c8"
    //% value.min=0 value.max=1
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=8
    export function Buzzer(pin: DigitalPin, value: enBuzzer): void
    {
        pins.setPull(pin, PinPullMode.PullNone);
        pins.digitalWritePin(pin, value);
    }

    //% blockId=cbit_Music_Car block="板载音乐播放|%index"
    //% weight=97
    //% blockGap=10
    //% color="#14a8c8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Music_Car(index: enMusic): void
    {
        switch (index)
        {
            case enMusic.dadadum: music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once); break;
            case enMusic.birthday: music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once); break;
            case enMusic.entertainer: music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once); break;
            case enMusic.prelude: music.beginMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once); break;
            case enMusic.ode: music.beginMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once); break;
            case enMusic.nyan: music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once); break;
            case enMusic.ringtone: music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once); break;
            case enMusic.funk: music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once); break;
            case enMusic.blues: music.beginMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once); break;
            case enMusic.wedding: music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once); break;
            case enMusic.funereal: music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once); break;
            case enMusic.punchline: music.beginMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once); break;
            case enMusic.baddy: music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once); break;
            case enMusic.chase: music.beginMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once); break;
            case enMusic.ba_ding: music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once); break;
            case enMusic.wawawawaa: music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once); break;
            case enMusic.jump_up: music.beginMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once); break;
            case enMusic.jump_down: music.beginMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once); break;
            case enMusic.power_up: music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once); break;
            case enMusic.power_down: music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once); break;
        }
    }
}

/*****************************************************************************************************************************************
 *    电机类 *****************************************************************************************************************************
 ****************************************************************************************************************************************/

//% color="#de7372" weight=21 icon="\uf185"
namespace NSbit_电机类
{
    const PCA9685_ADD = 0x40//PCA9685设备地址
    const MODE1 = 0x00
    const MODE2 = 0x01
    const SUBADR1 = 0x02
    const SUBADR2 = 0x03
    const SUBADR3 = 0x04

    const LED0_ON_L = 0x06
    const LED0_ON_H = 0x07
    const LED0_OFF_L = 0x08
    const LED0_OFF_H = 0x09

    const ALL_LED_ON_L = 0xFA
    const ALL_LED_ON_H = 0xFB
    const ALL_LED_OFF_L = 0xFC
    const ALL_LED_OFF_H = 0xFD

    const PRESCALE = 0xFE

    let initialized = false

    export enum CarState
    {
        //% blockId="Car_Run" block="前行"
        Car_Run = 1,
        //% blockId="Car_Back" block="后退"
        Car_Back = 2,
        //% blockId="Car_Left" block="左转"
        Car_Left = 3,
        //% blockId="Car_Right" block="右转"
        Car_Right = 4,
        //% blockId="Car_Stop" block="停止"
        Car_Stop = 5,
        //% blockId="Car_SpinLeft" block="原地左旋"
        Car_SpinLeft = 6,
        //% blockId="Car_SpinRight" block="原地右旋"
        Car_SpinRight = 7         
    }
    //电机可取值
    export enum AloneState
    {
        //% blockId="Left_Z_Motor" block="左前侧电机正转"
        LeftFront_Z_Motor = 1,
        //% blockId="Left_F_Motor" block="左前侧电机反转"
        LeftFront_F_Motor = 2,
        //% blockId="Right_Z_Motor" block="右前侧电机正转"
        RightFront_Z_Motor = 3,
        //% blockId="Right_F_Motor" block="右前侧电机反转"
        RightFront_F_Motor = 4,
        //% blockId="LeftRear_Z_Motor" block="左后侧电机正转"
        LeftRear_Z_Motor = 5,
        //% blockId="LeftRear_F_Motor" block="左后侧电机反转"
        LeftRear_F_Motor = 6,
        //% blockId="RightRear_Z_Motor" block="右后侧电机正转"
        RightRear_Z_Motor = 7,
        //% blockId="RightRear_F_Motor" block="右后侧电机反转"
        RightRear_F_Motor = 8	
    }

    function i2cwrite(addr: number, reg: number, value: number)
    {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2ccmd(addr: number, value: number)
    {
        let buf = pins.createBuffer(1)
        buf[0] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cread(addr: number, reg: number)
    {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    function initPCA9685(): void
    {
        i2cwrite(PCA9685_ADD, MODE1, 0x00)
        setFreq(50);
        initialized = true
    }

    function setFreq(freq: number): void
    {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        let oldmode = i2cread(PCA9685_ADD, MODE1);
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        i2cwrite(PCA9685_ADD, MODE1, newmode); // go to sleep
        i2cwrite(PCA9685_ADD, PRESCALE, prescale); // set the prescaler
        i2cwrite(PCA9685_ADD, MODE1, oldmode);
        control.waitMicros(5000);
        i2cwrite(PCA9685_ADD, MODE1, oldmode | 0xa1);
    }

    function setPwm(channel: number, on: number, off: number): void
    {
        if (channel < 0 || channel > 15)
            return;
        if (!initialized)
        {
            initPCA9685();
        }
        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADD, buf);
    }
    //左前侧电机正转
    function LeftFront_F_run(speed: number)
    {
        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096)
        {
            speed = 4095
        }
        if (speed <= 350 && speed != 0)
        {
            speed = 350
        }
        //使能
		setPwm(5, 0, 4095);
		setPwm(4, 0, 4095);
		//速度
        setPwm(12, 0, 0);
        setPwm(13, 0, speed);
    }   
    //左前侧电机反转
    function LeftFront_Z_run(speed: number)
    {
        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096)
        {
            speed = 4095
        }
        if (speed <= 350 && speed != 0)
        {
            speed = 350
        }
        //使能
        setPwm(5, 0, 4095);
        setPwm(4, 0, 4095);
        //速度
        setPwm(12, 0, speed);
        setPwm(13, 0, 0);
    }
    //右前侧电机正转
    function RightFront_F_run(speed: number)
    {
        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096)
        {
            speed = 4095
        }
        if (speed <= 350 && speed != 0)
        {
            speed = 350
        }
        //使能
        setPwm(5, 0, 4095);
        setPwm(4, 0, 4095);
        //速度
        setPwm(15, 0, 0);
        setPwm(14, 0, speed);
    } 
    //右前侧电机反转
    function RightFront_Z_run(speed: number)
    {
        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096)
        {
            speed = 4095
        }
        if (speed <= 350 && speed != 0)
        {
            speed = 350
        }
        //使能
		setPwm(5, 0, 4095);
		setPwm(4, 0, 4095);
		//速度
        setPwm(15, 0, speed);
        setPwm(14, 0, 0);
    }
    //左后侧电机正转
    function LeftRear_F_run(speed: number)
    {
        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096)
        {
            speed = 4095
        }
        if (speed <= 350 && speed != 0)
        {
            speed = 350
        }
        //使能
        setPwm(5, 0, 4095);
        setPwm(4, 0, 4095);
        //速度
        setPwm(3, 0, 0);
        setPwm(2, 0, speed);
    }
    //左后侧电机反转
    function LeftRear_Z_run(speed: number)
    {
        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096)
        {
            speed = 4095
        }
        if (speed <= 350 && speed != 0)
        {
            speed = 350
        }
        //使能
		setPwm(5, 0, 4095);
		setPwm(4, 0, 4095);
		//速度
        setPwm(3, 0, speed);
        setPwm(2, 0, 0);
    }
    //右后侧电机正转
    function RightRear_F_run(speed: number)
    {
        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096)
        {
            speed = 4095
        }
        if (speed <= 350 && speed != 0)
        {
            speed = 350
        }
        //使能
		setPwm(5, 0, 4095);
		setPwm(4, 0, 4095);
		//速度
        setPwm(0, 0, 0);
        setPwm(1, 0, speed);
    }  
    //右后侧电机反转
    function RightRear_Z_run(speed: number)
    {
        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096)
        {
            speed = 4095
        }
        if (speed <= 350 && speed != 0)
        {
            speed = 350
        }
        //使能
        setPwm(5, 0, 4095);
        setPwm(4, 0, 4095);
        //速度
        setPwm(0, 0, speed);
        setPwm(1, 0, 0);
    }
    //小车前进
    function Car_run(speed: number)
    {
        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096)
        {
            speed = 4095
        }
        if (speed <= 350)
        {
            speed = 350
        }
        //速度
        setPwm(12, 0, speed);
        setPwm(13, 0, 0);
        setPwm(14, 0, speed);
        setPwm(15, 0, 0);
    }
    //小车后退
    function Car_back(speed: number)
    {
        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096)
        {
            speed = 4095
        }
        if (speed <= 350 && speed != 0)
        {
            speed = 350
        }
        //速度
        setPwm(12, 0, 0);
        setPwm(13, 0, speed);
        setPwm(15, 0, 0);
        setPwm(14, 0, speed);
    }
    //小车左转
    function Car_left(speed: number)
    {
        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096)
        {
            speed = 4095
        }
        if (speed <= 350 && speed != 0)
        {
            speed = 350
        }
        //速度
        setPwm(12, 0, 0);
        setPwm(13, 0, 0);
        setPwm(14, 0, speed);
        setPwm(15, 0, 0);
    }
    //小车右转
    function Car_right(speed: number)
    {
        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096)
        {
            speed = 4095
        }
        if (speed <= 350 && speed != 0)
        {
            speed = 350
        }
        //速度
        setPwm(12, 0, speed);
        setPwm(13, 0, 0);
        setPwm(14, 0, 0);
        setPwm(15, 0, 0);
    }
    //小车停止
    function Car_stop()
    {   
        //速度
        setPwm(12, 0, 0);
        setPwm(13, 0, 0);
        setPwm(14, 0, 0);
        setPwm(15, 0, 0);
    }

    function Car_spinleft(speed: number)
    {
        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096)
        {
            speed = 4095
        }
        if (speed <= 350 && speed != 0)
        {
            speed = 350
        }
        //速度
        setPwm(12, 0, 0);
        setPwm(13, 0, speed);
        setPwm(14, 0, speed);
        setPwm(15, 0, 0);
    } 

    function Car_spinright(speed: number)
    {
        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096)
        {
            speed = 4095
        }
        if (speed <= 350 && speed != 0)
        {
            speed = 350
        }
        //速度
        setPwm(12, 0, speed);
        setPwm(13, 0, 0);
        setPwm(14, 0, 0);
        setPwm(15, 0, speed);
    }
    //% blockId=cbit_AloneCtrlSpeed block="单独电机|%index|速度 %speed"
    //% weight=91
    //% blockGap=10
    //% speed.min=0 speed.max=255
    //% color="#de7372"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=7
    export function AloneCtrlSpeed(index: AloneState, speed: number): void
    {
        switch (index)
        {
            case AloneState.LeftFront_F_Motor:
                LeftFront_F_run(speed);
                break;
            case AloneState.LeftFront_Z_Motor:
                LeftFront_Z_run(speed);
                break;
            case AloneState.RightFront_F_Motor:
                RightFront_F_run(speed);
                break;
            case AloneState.RightFront_Z_Motor:
                RightFront_Z_run(speed);
                break;
            case AloneState.LeftRear_F_Motor:
                LeftRear_F_run(speed);
                break;
            case AloneState.LeftRear_Z_Motor:
                LeftRear_Z_run(speed);
                break;
            case AloneState.RightRear_F_Motor:
                RightRear_F_run(speed);
                break;
            case AloneState.RightRear_Z_Motor:
                RightRear_Z_run(speed);
                break;
        }
    } 

    //% blockId=cbit_Fan block="风扇|引脚 %pin|速度 %value"
    //% weight=100
    //% blockGap=10
    //% color="#de7372"
    //% value.min=0 value.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=8
    export function Fan(pin: AnalogPin, value: number): void
    {
        value = value * 4; // map 100 to 1024
        if (value >= 1024)
        {
            value = 1023
        }
        if (value <= 100 && value != 0)
        {
            value = 100
        }
        pins.analogWritePin(pin, value);
    }

    //% blockId=cbit_Servo block="舵机|引脚 %pin|角度 %value"
    //% weight=100
    //% blockGap=10
    //% color="#de7372"
    //% value.min=0 value.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function Servo(pin: AnalogPin, value: number): void
    {
        pins.servoWritePin(pin, value);
    }

    // //% blockId=cbit_CarCtrl block="小车控制|%index"
    // //% weight=93
    // //% blockGap=10
    // //% color="#de7372"
    // //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    // export function CarCtrl(index: CarState): void {
    //     switch (index) {
    //         case CarState.Car_Run: Car_run(255); break;
    //         case CarState.Car_Back: Car_back(255); break;
    //         case CarState.Car_Left: Car_left(255); break;
    //         case CarState.Car_Right: Car_right(255); break;
    //         case CarState.Car_Stop: Car_stop(); break;
    //         case CarState.Car_SpinLeft: Car_spinleft(255); break;
    //         case CarState.Car_SpinRight: Car_spinright(255); break;
    //     }
    // }

    // //% blockId=cbit_CarCtrlSpeed block="小车控制|%index|速度 %speed"
    // //% weight=92
    // //% blockGap=10
    // //% speed.min=0 speed.max=255
    // //% color="#de7372"
    // //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    // export function CarCtrlSpeed(index: CarState, speed: number): void {
    //     switch (index) {
    //         case CarState.Car_Run: Car_run(speed); break;
    //         case CarState.Car_Back: Car_back(speed); break;
    //         case CarState.Car_Left: Car_left(speed); break;
    //         case CarState.Car_Right: Car_right(speed); break;
    //         case CarState.Car_Stop: Car_stop(); break;
    //         case CarState.Car_SpinLeft: Car_spinleft(speed); break;
    //         case CarState.Car_SpinRight: Car_spinright(speed); break;
    //     }
    // }



}

//% color="#14c884" weight=20 icon="\uf1b9"
// namespace NSbit_小车类 {

//     const PCA9685_ADD = 0x40
//     const MODE1 = 0x00
//     const MODE2 = 0x01
//     const SUBADR1 = 0x02
//     const SUBADR2 = 0x03
//     const SUBADR3 = 0x04

//     const LED0_ON_L = 0x06
//     const LED0_ON_H = 0x07
//     const LED0_OFF_L = 0x08
//     const LED0_OFF_H = 0x09

//     const ALL_LED_ON_L = 0xFA
//     const ALL_LED_ON_H = 0xFB
//     const ALL_LED_OFF_L = 0xFC
//     const ALL_LED_OFF_H = 0xFD

//     const PRESCALE = 0xFE

//     let initialized = false
    //let yahStrip: neopixel.Strip;



    // export enum enPos {

    //     //% blockId="LeftState" block="左边状态"
    //     LeftState = 1,
    //     //% blockId="RightState" block="右边状态"
    //     RightState = 0
    // }

    // export enum enLineState {
    //     //% blockId="White" block="白线"
    //     White = 0,
    //     //% blockId="Black" block="黑线"
    //     Black = 1

    // }
    
    // export enum enAvoidState {
    //     //% blockId="OBSTACLE" block="有障碍物"
    //     OBSTACLE = 0,
    //     //% blockId="NOOBSTACLE" block="无障碍物"
    //     NOOBSTACLE = 1

    // }

    
    // export enum enServo {
        
    //     S1 = 1,
    //     S2,
    //     S3
    // }




    // //% blockId=cbit_RGB_Car_Program block="七彩流水灯"
    // //% weight=99
    // //% blockGap=10
    // //% color="#c85ad8"
    // //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    // export function RGB_Car_Program(): neopixel.Strip {
         
    //     if (!yahStrip) {
    //         yahStrip = neopixel.create(DigitalPin.P16, 3, NeoPixelMode.RGB);
    //     }
    //     return yahStrip;  
    // }





    // //% blockId=cbit_Servo_Car block="小车舵机|编号 %num|角度 %value"
    // //% weight=96
    // //% blockGap=10
    // //% color="#c85ad8"
    // //% num.min=1 num.max=3 value.min=0 value.max=180
    // //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    // export function Servo_Car(num: enServo, value: number): void {

    //     // 50hz: 20,000 us
    //     let us = (value * 1800 / 180 + 600); // 0.6 ~ 2.4
    //     let pwm = us * 4096 / 20000;
    //     setPwm(num + 2, 0, pwm);

    // }

    // //% blockId=cbit_Avoid_Sensor block="避障传感器|检测到 %value"
    // //% weight=95
    // //% blockGap=10
    // //% color="#c85ad8"
    // //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    // export function Avoid_Sensor(value: enAvoidState): boolean {

    //     let temp: boolean = false;
    //     pins.digitalWritePin(DigitalPin.P9, 0);
    //     switch (value) {
    //         case enAvoidState.OBSTACLE: {
    //             if (pins.analogReadPin(AnalogPin.P3) < 800) {
                
    //                 temp = true;
    //                 setPwm(8, 0, 0);
    //             }
    //             else {                 
    //                 temp = false;
    //                 setPwm(8, 0, 4095);
    //             }
    //             break;
    //         }

    //         case enAvoidState.NOOBSTACLE: {
    //             if (pins.analogReadPin(AnalogPin.P3) > 800) {

    //                 temp = true;
    //                 setPwm(8, 0, 4095);
    //             }
    //             else {
    //                 temp = false;
    //                 setPwm(8, 0, 0);
    //             }
    //             break;
    //         }
    //     }
    //     pins.digitalWritePin(DigitalPin.P9, 1);
    //     return temp;

    // }
    // //% blockId=cbit_Line_Sensor block="巡线传感器|位置 %direct|检测到 %value"
    // //% weight=94
    // //% blockGap=10
    // //% color="#c85ad8"
    // //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    // export function Line_Sensor(direct: enPos, value: enLineState): boolean {

    //     let temp: boolean = false;

    //     switch (direct) {
    //         case enPos.LeftState: {
    //             if (pins.analogReadPin(AnalogPin.P1) < 500) {
    //                 if (value == enLineState.White) {
    //                     temp = true;
    //                 }
    //                 setPwm(7, 0, 4095);
    //             }
    //             else {
    //                 if (value == enLineState.Black) {
    //                     temp = true;
    //                 }
    //                 setPwm(7, 0, 0);
    //             }
    //             break;
    //         }

    //         case enPos.RightState: {
    //             if (pins.analogReadPin(AnalogPin.P2) < 500) {
    //                 if (value == enLineState.White) {
    //                     temp = true;
    //                 }
    //                 setPwm(6, 0, 4095);
    //             }
    //             else {
    //                 if (value == enLineState.Black) {
    //                     temp = true;
    //                 }
    //                 setPwm(6, 0, 0);
    //             }
    //             break;
    //         }
    //     }
    //     return temp;

    // }

   
// }
