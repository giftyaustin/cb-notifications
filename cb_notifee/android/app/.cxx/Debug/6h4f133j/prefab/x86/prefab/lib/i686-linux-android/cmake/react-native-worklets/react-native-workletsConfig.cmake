if(NOT TARGET react-native-worklets::worklets)
add_library(react-native-worklets::worklets SHARED IMPORTED)
set_target_properties(react-native-worklets::worklets PROPERTIES
    IMPORTED_LOCATION "D:/Chat-Bucket/cb-notifications/cb_notifee/node_modules/react-native-worklets/android/build/intermediates/cxx/Debug/6am1w5o4/obj/x86/libworklets.so"
    INTERFACE_INCLUDE_DIRECTORIES "D:/Chat-Bucket/cb-notifications/cb_notifee/node_modules/react-native-worklets/android/build/prefab-headers/worklets"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

