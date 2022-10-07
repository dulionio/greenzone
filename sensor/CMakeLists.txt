set(EXECUTABLE_NAME "verte")

find_package(CURL REQUIRED)

add_subdirectory(src)
include_directories(SYSTEM ${CURL_INCLUDE_DIR})
target_include_directories(${EXECUTABLE_NAME} PRIVATE src)
target_link_libraries(${EXECUTABLE_NAME} ${CURL_LIBRARIES})
