import { View, Text, StatusBar, TextInput, TouchableOpacity,KeyboardAvoidingView } from 'react-native'
import React, { useState,useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image,ScrollView } from 'react-native'
import { theme } from '../theme'
import {debounce} from 'lodash';
import { CalendarDaysIcon, HandRaisedIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { MapPinIcon } from 'react-native-heroicons/solid'
import { fetchLocations } from '../api/weather'
export default function HomeScreen() {
    const [showSearch, toggleSearch] = useState(false);
    const [locations, setLocations] = useState([1, 2, 3]);
    const handleLocation = (loc) => {
        console.log('location: ', loc);
    }
    const handleSearch = value=>{
        // fetch locations
        fetchLocations({cityName: value}).then(data=>{
            console.log('got data: ',data);
        })
    }
    const handleTextDebounce = useCallback(debounce(handleSearch,1200),[])

    return (
        <View className="flex-1 relative">
            <StatusBar style="light" />
            <Text>hello</Text>
            <Image blurRadius={70} className="absolute h-full w-full" source={require('../assets/images/bg.png')} />
            <SafeAreaView className="flex flex-1">
                {/* search section */}
                <View style={{ height: '7%' }} className="mx-4 relative z-50">
                    <View className="flex-row justify-end items-center rounded-full" style={{ backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent' }}>
                        {
                            showSearch ? (
                                <TextInput
                                    onChangeText={handleTextDebounce}
                                    placeholder="Search city"
                                    placeholderTextColor={'lightgray'}
                                    className="pl-6 h-10 pb-1 flex-1 text-base text-white"
                                />
                            ) : null
                        }
                        <TouchableOpacity onPress={() => toggleSearch(!showSearch)} style={{ backgroundColor: theme.bgWhite(0.3) }} className="rounded-full p-3 m-1">
                            <MagnifyingGlassIcon size="25" color="white" />
                        </TouchableOpacity>
                    </View>
                    {
                        locations.length > 0 && showSearch ? (
                            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                                {
                                    locations.map((loc, index) => {
                                        let showBorder = index + 1 != locations.length;
                                        let borderClass = showBorder ? "border-b-2 border-b-gray-400" : '';
                                        return (
                                            <TouchableOpacity
                                                onPress={() => handleLocation(loc)}
                                                key={index}
                                                className={"flex-row items-center border-0 p-2 px-4 mb-1 " + borderClass}
                                            >
                                                <MapPinIcon size="20" color="gray" />
                                                <Text className="text-black text-lg ml-2">London, United Kingdom</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        ) : null
                    }
                </View>
                {/* forcast section */}
                <View className="mx-4 flex justify-around flex-1 mb-2">
                    {/* location */}
                    <Text className="text-white text-center text-2xl font-bold">
                        London,
                        <Text className="text-lg font-semibold text-gray-300">
                            United Kingdom
                        </Text>
                    </Text>
                    {/* weather image */}
                    <View className="flex-row justify-center">
                        <Image source={require('../assets/images/partlycloudy.png')} className="w-52 h-52" />
                    </View>
                    {/* degree celcius */}
                    <View className="space-y-2">
                        <Text className="text-center font-bold text-white text-6xl ml-5">
                            23&#176;
                        </Text>
                        <Text className="text-center text-white text-xl tracking-widest">
                            Partly cloudy
                        </Text>
                    </View>
                    {/* other stats */}
                    <View className="flex-row justify-between mx-4">
                        <View className="flex-row space-x-2 items-center">
                            <Image source={require('../assets/icons/wind.png')} className="h-6 w-6" />
                            <Text className="text-white font-semibold text-base">
                                22km
                            </Text>
                        </View>
                        <View className="flex-row space-x-2 items-center">
                            <Image source={require('../assets/icons/drop.png')} className="h-6 w-6" />
                            <Text className="text-white font-semibold text-base">
                                23%
                            </Text>
                        </View>
                        <View className="flex-row space-x-2 items-center">
                            <Image source={require('../assets/icons/sun.png')} className="h-6 w-6" />
                            <Text className="text-white font-semibold text-base">
                                6: 05 AM
                            </Text>
                        </View>
                    </View>
                </View>

                {/* forcast session for next days */}
                <View className="mb-5 space-y-3">
                    <View className="flex-row items-center mx-5 space-x-2">
                        <CalendarDaysIcon size="22" color="white" />
                        <Text className="text-white text-base ">
                            Daily forecast
                        </Text>
                    </View>
                    <ScrollView horizontal contentContainerStyle={{paddingHorizontal: 15}} showsHorizontalScrollIndicator={false}>
                        <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(0.15)}}>
                            <Image source={require('../assets/images/heavyrain.png')} className="h-11 w-11" />
                            <Text className="text-white">Monday</Text>
                            <Text className="text-white text-xl font-semibold">13&#176;</Text>
                        </View>
                        <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(0.15)}}>
                            <Image source={require('../assets/images/heavyrain.png')} className="h-11 w-11" />
                            <Text className="text-white">Tuesday</Text>
                            <Text className="text-white text-xl font-semibold">13&#176;</Text>
                        </View>
                        <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(0.15)}}>
                            <Image source={require('../assets/images/heavyrain.png')} className="h-11 w-11" />
                            <Text className="text-white">Wednesday</Text>
                            <Text className="text-white text-xl font-semibold">13&#176;</Text>
                        </View>
                        <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(0.15)}}>
                            <Image source={require('../assets/images/heavyrain.png')} className="h-11 w-11" />
                            <Text className="text-white">Thursday</Text>
                            <Text className="text-white text-xl font-semibold">13&#176;</Text>
                        </View>
                        <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(0.15)}}>
                            <Image source={require('../assets/images/heavyrain.png')} className="h-11 w-11" />
                            <Text className="text-white">Friday</Text>
                            <Text className="text-white text-xl font-semibold">13&#176;</Text>
                        </View>
                        <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(0.15)}}>
                            <Image source={require('../assets/images/heavyrain.png')} className="h-11 w-11" />
                            <Text className="text-white">Saturday</Text>
                            <Text className="text-white text-xl font-semibold">13&#176;</Text>
                        </View>
                        <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(0.15)}}>
                            <Image source={require('../assets/images/heavyrain.png')} className="h-11 w-11" />
                            <Text className="text-white">Sunday</Text>
                            <Text className="text-white text-xl font-semibold">13&#176;</Text>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    )
}