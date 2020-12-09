/*
R
modified from liusen
load dependency
"cbit": "file:../pxt-cbit"
*/



//% color="#5984c7" weight=25 icon="\uf1d4"
namespace NSbit_数码管类 {
    
    export enum enColor {

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
    export enum enLED1 {
        
        //% blockId="OFF" block="灭"
        OFF = 0,
        //% blockId="ON" block="亮"
        ON =1
    }

    //% blockId=cbit_LED1 block="LED灯|引脚 %pin|状态 %value"
    //% weight=5
    //% blockGap=8
    //% color="#5984c7"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=1
    export function LED1(pin: DigitalPin, value: enLED1): void {

        pins.digitalWritePin(pin, value);

    }

    //% blockId=cbit_LED2 block="LED灯|引脚 %pin|亮度 %value"
    //% weight=4
    //% blockGap=8
    //% color="#5984c7"
    //% value.min=0 value.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=2
    export function LED2(pin: AnalogPin, value: number): void {

        pins.analogWritePin(pin, value * 1024 / 256);

    }
}
