find_package(CURL REQUIRED)
add_executable(verte src/bme280.c src/main.c)
include_directories(${CURL_INCLUDE_DIR})
target_link_libraries(verte ${CURL_LIBRARIES})