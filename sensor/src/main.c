/*
  Comple：make
  Run: ./bme280

  This Demo is tested on Raspberry PI 3B+
  you can use I2C or SPI interface to test this Demo
  When you use I2C interface,the default Address in this demo is 0X77
  When you use SPI interface,PIN 27 define SPI_CS
*/
#include "bme280.h"
#include <stdio.h>
#include <unistd.h>

// Raspberry 3B+ platform's default SPI channel
#define channel 0

// Default write it to the register in one time
#define USESPISINGLEREADWRITE 0

// This definition you use I2C or SPI to drive the bme280
// When it is 1 means use I2C interface, When it is 0,use SPI interface
#define USEIIC 1

#include <string.h>
#include <stdlib.h>
#include <linux/i2c-dev.h>
#include <sys/ioctl.h>
#include <sys/types.h>
#include <curl/curl.h>
#include <fcntl.h>
// Raspberry 3B+ platform's default I2C device file
#define IIC_Dev "/dev/i2c-1"

int fd;

void user_delay_ms(uint32_t period)
{
  usleep(period * 1000);
}

int8_t user_i2c_read(uint8_t id, uint8_t reg_addr, uint8_t *data, uint16_t len)
{
  write(fd, &reg_addr, 1);
  read(fd, data, len);
  return 0;
}

int8_t user_i2c_write(uint8_t id, uint8_t reg_addr, uint8_t *data, uint16_t len)
{
  int8_t *buf;
  buf = malloc(len + 1);
  buf[0] = reg_addr;
  memcpy(buf + 1, data, len);
  write(fd, buf, len + 1);
  free(buf);
  return 0;
}

void print_sensor_data(struct bme280_data *comp_data)
{
  printf(
      "temperature: %0.2f*C   pressure: %0.2fhPa   humidity: %0.2f%%\n",
      comp_data->temperature,
      comp_data->pressure / 100,
      comp_data->humidity);
}

int8_t stream_sensor_data_forced_mode(struct bme280_dev *dev)
{
  int8_t rslt;
  uint8_t settings_sel;
  struct bme280_data comp_data;

  /* Recommended mode of operation: Indoor navigation */
  dev->settings.osr_h = BME280_OVERSAMPLING_1X;
  dev->settings.osr_p = BME280_OVERSAMPLING_16X;
  dev->settings.osr_t = BME280_OVERSAMPLING_2X;
  dev->settings.filter = BME280_FILTER_COEFF_16;

  settings_sel = BME280_OSR_PRESS_SEL | BME280_OSR_TEMP_SEL | BME280_OSR_HUM_SEL | BME280_FILTER_SEL;

  rslt = bme280_set_sensor_settings(settings_sel, dev);

  /* Continuously stream sensor data */
  while (1)
  {
    rslt = bme280_set_sensor_mode(BME280_FORCED_MODE, dev);
    /* Wait for the measurement to complete and print data @25Hz */
    dev->delay_ms(40);
    rslt = bme280_get_sensor_data(BME280_ALL, &comp_data, dev);
    print_sensor_data(&comp_data);
    // Wait before next measureent
    dev->delay_ms(5000);
  }

  return rslt;
}

int main(int argc, char *argv[])
{
  CURL *curl;
  curl_global_init(CURL_GLOBAL_ALL);

  struct bme280_dev dev;
  int8_t rslt = BME280_OK;

  if ((fd = open(IIC_Dev, O_RDWR)) < 0)
  {
    printf("Failed to open the i2c bus %s", argv[1]);
    exit(1);
  }

  if (ioctl(fd, I2C_SLAVE, 0x77) < 0)
  {
    printf("Failed to acquire i2c bus access or talk to slave.\n");
    exit(1);
  }

  // dev.dev_id = BME280_I2C_ADDR_PRIM;//0x76
  dev.dev_id = BME280_I2C_ADDR_SEC; // 0x77
  dev.intf = BME280_I2C_INTF;
  dev.read = user_i2c_read;
  dev.write = user_i2c_write;
  dev.delay_ms = user_delay_ms;

  rslt = bme280_init(&dev);
  printf("Sensor initialization result is: %d \n", rslt);

  stream_sensor_data_forced_mode(&dev);

  printf("Exiting...\n")
  curl_global_cleanup();
  return 0;
}
