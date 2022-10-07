/*
  Reads sensor data and sends as JSON to host service.
*/
#include "bme280.h"
#include <curl/curl.h>
#include <fcntl.h>
#include <linux/i2c-dev.h>
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/ioctl.h>
#include <sys/types.h>
#include <unistd.h>

// Raspberry 3B+ platform's default I2C device file
#define IIC_Dev "/dev/i2c-1"

volatile sig_atomic_t done = 0;

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

void send_data(CURL *curl, struct bme280_data *data)
{
    time_t now;
    char date_time[sizeof "1970-01-01T00:00:00Z" + 1];
    char *json_fmt;
    ssize_t json_size;
    char *json_buf;
    int8_t rslt;
    struct curl_slist *header = NULL;

    printf("temperature: %0.2f*F   pressure: %0.2fhPa   humidity: %0.2f%%\n",
           data->temperature * 9.0 / 5.0 + 32.0,
           data->pressure / 100.0,
           data->humidity);

    json_fmt = "{"
               "\"sensorId\" : \"519801e6-bac1-46bf-8687-f9631a2e6b0c\","
               "\"dateTime\" : \"%s\","
               "\"temperature\" : %5.1f,"
               "\"humidity\" : %5.1f,"
               "\"pressure\" : %6.1f"
               "}";

    time(&now);
    strftime(date_time, sizeof date_time, "%FT%TZ", gmtime(&now));
    json_size = 1 + snprintf(NULL, 0, json_fmt, &date_time, data->temperature, data->pressure, data->humidity);
    json_buf = malloc(json_size);
    snprintf(json_buf, json_size, json_fmt, &date_time, data->temperature, data->pressure, data->humidity);

    header = curl_slist_append(header, "Content-Type: application/json");
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, header);
    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, json_buf);
    rslt = curl_easy_perform(curl);
    if (rslt != BME280_OK)
    {
        fprintf(stderr, "Failed to send sensor data to server: %d.\n", rslt);
    }

    curl_slist_free_all(header); /* free the list */
    free(json_buf);
}

void start_stream(CURL *curl, struct bme280_dev *dev)
{
    int8_t rslt;
    uint8_t settings_sel;
    struct bme280_data data;

    /* Recommended mode of operation: Indoor navigation */
    dev->settings.osr_h = BME280_OVERSAMPLING_1X;
    dev->settings.osr_p = BME280_OVERSAMPLING_16X;
    dev->settings.osr_t = BME280_OVERSAMPLING_2X;
    dev->settings.filter = BME280_FILTER_COEFF_16;

    settings_sel = BME280_OSR_PRESS_SEL | BME280_OSR_TEMP_SEL | BME280_OSR_HUM_SEL | BME280_FILTER_SEL;

    rslt = bme280_set_sensor_settings(settings_sel, dev);
    if (rslt != BME280_OK)
    {
        fprintf(stderr, "Failed to configure sensor.\n");
        exit(1);
    }

    // Continuously stream sensor data
    while (!done)
    {
        dev->delay_ms(5000);

        rslt = bme280_set_sensor_mode(BME280_FORCED_MODE, dev);
        if (rslt != BME280_OK)
        {
            fprintf(stderr, "Failed to wake sensor.\n");
            continue;
        }

        // Wait for the measurement to complete and print data @25Hz
        dev->delay_ms(40);
        rslt = bme280_get_sensor_data(BME280_ALL, &data, dev);
        if (rslt != BME280_OK)
        {
            fprintf(stderr, "Failed to retrieve sensor data.\n");
            continue;
        }

        send_data(curl, &data);
    }
    printf("Cleaning up...");
}

void start_device(CURL *curl)
{
    struct bme280_dev dev;
    int8_t rslt;

    if ((fd = open(IIC_Dev, O_RDWR)) < 0)
    {
        fprintf(stderr, "Failed to open the i2c bus %s\n", IIC_Dev);
        exit(1);
    }

    if (ioctl(fd, I2C_SLAVE, 0x77) < 0)
    {
        fprintf(stderr, "Failed to acquire i2c bus access or talk to slave.\n");
        exit(1);
    }

    // dev.dev_id = BME280_I2C_ADDR_PRIM;//0x76
    dev.dev_id = BME280_I2C_ADDR_SEC; // 0x77
    dev.intf = BME280_I2C_INTF;
    dev.read = user_i2c_read;
    dev.write = user_i2c_write;
    dev.delay_ms = user_delay_ms;

    rslt = bme280_init(&dev);
    if (rslt != BME280_OK)
    {
        fprintf(stderr, "Failed to acquire initialize sensor.\n");
        exit(1);
    }

    start_stream(curl, &dev);
}

void start_curl(char *url)
{
    CURL *curl;
    curl_global_init(CURL_GLOBAL_ALL);
    curl = curl_easy_init();
    if (!curl)
    {
        fprintf(stderr, "Failed to initialize curl.\n");
        exit(1);
    }

    curl_easy_setopt(curl, CURLOPT_VERBOSE, 1L);
    curl_easy_setopt(curl, CURLOPT_HEADER, 1L);
    curl_easy_setopt(curl, CURLOPT_URL, url);

    start_device(curl);
    curl_global_cleanup();
}

void termination_handler(int signum)
{
    done = 1;
}

void show_help()
{
    fprintf(stderr, "Usage: verte <url>\n");
    exit(1);
}

int main(int argc, char *argv[])
{
    int opt;
    char *url;

    while ((opt = getopt(argc, argv, "h")) != -1)
    {
        switch (opt)
        {
        case 'h':
        default:
            show_help();
        }
    }

    if (argc - optind != 1)
    {
        show_help();
    }

    url = argv[optind];
    if (url[strlen(url) - 1] == '/')
    {
        url[strlen(url) - 1] = 0;
    }

    struct sigaction ignore;
    ignore.sa_handler = SIG_IGN;
    sigemptyset(&ignore.sa_mask);
    sigaction(SIGHUP, &ignore, NULL);

    struct sigaction action;
    action.sa_handler = termination_handler;
    sigemptyset(&action.sa_mask);
    sigaction(SIGINT, &action, NULL);
    sigaction(SIGTERM, &action, NULL);

    start_curl(url);

    printf(" Done.\n");
    return 0;
}
