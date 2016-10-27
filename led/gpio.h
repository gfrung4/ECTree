#ifndef _BEAGLEBONE_GPIO_H_
#define _BEAGLEBONE_GPIO_H_

//#define GPIO1_START_ADDR 0x4804C000
#define GPIO0_START_ADDR 0x44e07000
#define GPIO0_END_ADDR 0x44e09000
#define GPIO0_SIZE (GPIO0_END_ADDR - GPIO0_START_ADDR)

#define GPIO1_START_ADDR 0x4804C000
#define GPIO1_END_ADDR 0x4804e000
#define GPIO1_SIZE (GPIO1_END_ADDR - GPIO1_START_ADDR)

#define GPIO2_START_ADDR 0x481AC000
#define GPIO2_END_ADDR 0x481AE000
#define GPIO2_SIZE (GPIO2_END_ADDR - GPIO2_START_ADDR)

#define GPIO3_START_ADDR 0x481AE000
#define GPIO3_END_ADDR 0x481B0000
#define GPIO3_SIZE (GPIO3_END_ADDR - GPIO3_START_ADDR)

#define GPIO_OE 0x134
#define GPIO_DATAIN 0x138
#define GPIO_SETDATAOUT 0x194
#define GPIO_CLEARDATAOUT 0x190

// GPIO0
#define P9_22  (1<<2)
#define P9_21  (1<<3)
#define P9_18  (1<<4)
#define P9_17  (1<<5)
#define P9_42  (1<<7)
#define P8_35  (1<<8)
#define P8_33  (1<<9)
#define P8_31  (1<<10)
#define P8_32  (1<<11)
#define P9_20  (1<<12)
#define P9_19  (1<<13)
#define P9_26  (1<<14)
#define P9_24  (1<<15)
#define P9_41  (1<<20)
#define P8_19  (1<<22)
#define P8_13  (1<<23)
#define P8_14  (1<<26)
#define P8_17  (1<<27)
#define P9_11  (1<<30)
#define P9_13  (1<<31)

// GPIO1
#define P8_25  (1<<0)
#define P8_24  (1<<1)
#define P8_5  (1<<2)
#define P8_6  (1<<3)
#define P8_23  (1<<4)
#define P8_22  (1<<5)
#define P8_3  (1<<6)
#define P8_4  (1<<7)
#define P8_12  (1<<12)
#define P8_11  (1<<13)
#define P8_16  (1<<14)
#define P8_15  (1<<15)
#define P9_23  (1<<17)
#define P9_14  (1<<18)
#define P9_16  (1<<19)
#define USR0  (1<<21)
#define USR1  (1<<22)
#define USR2  (1<<23)
#define USR3  (1<<24)
#define P9_12  (1<<28)
#define P8_26  (1<<29)
#define P8_21  (1<<30)
#define P8_20  (1<<31)

// GPIO2
#define P8_18  (1<<1)
#define P8_8  (1<<3)
#define P8_10  (1<<4)
#define P8_9  (1<<5)
#define P8_45  (1<<6)
#define P8_46  (1<<7)
#define P8_43  (1<<8)
#define P8_44  (1<<9)
#define P8_41  (1<<10)
#define P8_42  (1<<11)
#define P8_39  (1<<12)
#define P8_40  (1<<13)
#define P8_37  (1<<14)
#define P8_38  (1<<15)
#define P8_36  (1<<16)
#define P8_34  (1<<17)
#define P9_15  (1<<18)
#define P8_27  (1<<22)
#define P8_29  (1<<23)
#define P8_28  (1<<24)
#define P8_30  (1<<25)

// GPIO3
#define P9_31  (1<<14)
#define P9_29  (1<<15)
#define P9_30  (1<<16)
#define P9_28  (1<<17)
#define P9_27  (1<<19)
#define P9_25  (1<<21)

#endif
