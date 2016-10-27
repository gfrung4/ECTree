#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <signal.h>
#include "gpio.h"
#include <stdint.h>
#include <stdio.h>
#include <unistd.h>
#include <termios.h>

volatile void *gpio_addr0;
volatile unsigned int *gpio_oe_addr0;
volatile unsigned int *gpio_datain0;
volatile unsigned int *gpio_setdataout_addr0;
volatile unsigned int *gpio_cleardataout_addr0;

void sendZero() {
  *gpio_cleardataout_addr0 = P9_18;
  *gpio_setdataout_addr0 = P9_22;
  *gpio_cleardataout_addr0 = P9_22;
}

void sendOne() {
  *gpio_setdataout_addr0 = P9_18;
  *gpio_setdataout_addr0 = P9_22;
  *gpio_cleardataout_addr0 = P9_22;
}

void reset() {
  *gpio_cleardataout_addr0 = P9_18;
  *gpio_cleardataout_addr0 = P9_22;
}

void sendByte(uint8_t b) {
  uint8_t bit;
  for(bit=0x80; bit; bit >>= 1) {
    if(b & bit) {
      sendOne();
    } else {
      sendZero();
    }
  }
}

int main(int argc, char *argv[]) {
		// Memory map on GPIO0 and GPIO1
    int fd = open("/dev/mem", O_RDWR);
    gpio_addr0 = mmap(0, GPIO0_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO0_START_ADDR);
    gpio_oe_addr0           = gpio_addr0 + GPIO_OE;
		gpio_datain0            = gpio_addr0 + GPIO_DATAIN;
    gpio_setdataout_addr0   = gpio_addr0 + GPIO_SETDATAOUT;
    gpio_cleardataout_addr0 = gpio_addr0 + GPIO_CLEARDATAOUT;

		// Print if there was a failure
    if(gpio_addr0 == MAP_FAILED) {
        printf("Unable to map GPIO\n");
        exit(1);
    }

		// Set the buttons to be inputs
    unsigned int reg = *gpio_oe_addr0;
		reg &= ~P9_18;
		reg &= ~P9_22;
    *gpio_oe_addr0 = reg;

		// Enter RAW mode
	  struct termios settings;
	  tcgetattr(0, &settings);
	  cfmakeraw(&settings);
	  tcsetattr(0, TCSANOW, &settings);

	  // Loop, reading characters
	  char c;

    // Create blank leds
    char leds[480];
    int kk;
    for(kk = 0; kk < 480; kk++) {
      leds[kk] = 0x80;
    }


    uint16_t i;
    for(i = 0; i < 160*3; i++) {
      sendByte(leds[i]);
    }
    for(i = 0; i < 5; i++) {
      sendByte(0x00);
    }


    int j = 0;
    int cnt = 0;
    int change[5];
    	  while (read(0, &c, 1)) {
        if(c>128) {
          uint16_t i;
  			  for(i = 0; i < 160*3; i++) {
  				  sendByte(leds[i]);
  			  }
  			  for(i = 0; i < 5; i++) {
  				  sendByte(0x00);
  			  }
          cnt = 0;
        } else {
        change[cnt++] = c;
        if(cnt==5) {
          int led = change[0]*128+change[1];
          leds[led*3] = change[2] + 0x80;
          leds[led*3+1] = change[3] + 0x80;
          leds[led*3+2] = change[4] + 0x80;
          cnt = 0;
        }
      }
	  }
	  return 0;

		// Unmap memory
    munmap((void *)gpio_addr0, GPIO0_SIZE);
    close(fd);

		// Return success
    return 0;
}
